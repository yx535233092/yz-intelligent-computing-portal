'use client';

import React, { useState, useCallback } from 'react';
import {
  Button,
  Table,
  Tabs,
  Spin,
  Skeleton,
  App,
  Upload,
  Checkbox,
} from 'antd';
import {
  PlayCircleOutlined,
  DownloadOutlined,
  FileTextOutlined,
  IdcardOutlined,
  EyeOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import type { TabsProps } from 'antd';
import * as XLSX from 'xlsx';
import {
  getOcrPicAPI,
  ocrFileAPI,
  ocrUploadAPI,
} from '@/apis/data-process/ocr';

// API响应类型定义

// OCR识别结果类型定义
interface OCRResult {
  address_location_1: string;
  address_location_2: string;
  birth_location: string;
  sign_date: string;
  expire_date: string;
  id_number: string;
  full_name: string;
  birth_date: string;
  nation: string;
  gender: string;
  qr_data: string;
}

// 文件类型定义
interface FileItem {
  id: number;
  name: string;
  status: string;
  file?: File;
  frontImage?: string; // 正面图片base64
  backImage?: string; // 背面图片base64
}

// 示例数据
const sampleFiles: FileItem[] = [
  { id: 1, name: '身份证样本1', status: 'ready' },
  { id: 2, name: '身份证样本2', status: 'ready' },
  { id: 3, name: '身份证样本3', status: 'ready' },
];

// 将OCR结果转换为表格数据
const getRecognitionResults = (ocrData: OCRResult | null) => {
  if (!ocrData) return [];

  const baseResults = [
    { key: '1', field: '姓名（Họ và Tên）', value: ocrData.full_name },
    { key: '2', field: '性别（Giới tính）', value: ocrData.gender },
    { key: '4', field: '出生日期（Ngày sinh）', value: ocrData.birth_date },
    { key: '6', field: '身份证号（Số CMND）', value: ocrData.id_number },
    { key: '9', field: '签发日期（Ngày cấp）', value: ocrData.sign_date },
    {
      key: '10',
      field: '失效日期（Ngày hết hạn）',
      value: ocrData.expire_date,
    },
    { key: '5', field: '籍贯（Quê quán）', value: ocrData.birth_location },
    {
      key: '7',
      field: '家庭住址（Địa chỉ Thường Trú）',
      value: `${ocrData.address_location_1} ${ocrData.address_location_2}`,
    },
    { key: '3', field: '国籍（Dân tộc）', value: ocrData.nation },
  ];

  // 如果有qr_data字段且不为空，则添加到结果中
  if (ocrData.qr_data && ocrData.qr_data.trim() !== '') {
    baseResults.push({
      key: '11',
      field: '二维码数据（QR Code）',
      value: ocrData.qr_data,
    });
  }

  return baseResults;
};

export default function OCRRecognizePage() {
  const { message } = App.useApp();
  const [selectedFiles, setSelectedFiles] = useState<FileItem[]>([]);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [hasRecognized, setHasRecognized] = useState(false);
  const [activeTab, setActiveTab] = useState('fields');
  const [loadingFileIds, setLoadingFileIds] = useState<Set<number>>(new Set());
  const [ocrResults, setOcrResults] = useState<Record<number, OCRResult>>({});
  // 本地上传（正反面）
  const [uploadFrontFile, setUploadFrontFile] = useState<File | null>(null);
  const [uploadBackFile, setUploadBackFile] = useState<File | null>(null);
  const [uploadFrontPreview, setUploadFrontPreview] = useState<string | null>(
    null
  );
  const [uploadBackPreview, setUploadBackPreview] = useState<string | null>(
    null
  );
  const Dragger = Upload.Dragger;

  // 获取身份证图片
  const fetchIDCardImages = useCallback(
    async (fileId: number) => {
      setLoadingFileIds((prev) => new Set(prev).add(fileId));
      const startTime = Date.now();

      try {
        console.log(`正在请求API，文件ID: ${fileId}`);

        const response = await getOcrPicAPI({
          input_path_1: '',
          input_path_2: '',
          mode: fileId,
        });

        const data = response;
        console.log('API响应数据:', data);

        // 计算已经过去的时间
        const elapsedTime = Date.now() - startTime;
        const minLoadingTime = 300; // 最小加载时间300ms

        // 如果加载时间不足300ms，则等待剩余时间
        if (elapsedTime < minLoadingTime) {
          const remainingTime = minLoadingTime - elapsedTime;
          await new Promise((resolve) => setTimeout(resolve, remainingTime));
        }

        // 更新选中文件列表中的图片数据
        setSelectedFiles((prev) =>
          prev.map((file) =>
            file.id === fileId
              ? {
                  ...file,
                  frontImage: data.file_1_base64,
                  backImage: data.file_2_base64,
                }
              : file
          )
        );

        // message.success('图片加载成功');
      } catch (error) {
        console.error('获取图片失败:', error);

        if (error instanceof Error) {
          if (
            error.message.includes('503') ||
            error.message.includes('服务暂时不可用')
          ) {
            message.error('服务器暂时不可用，请稍后重试');
          } else if (error.message.includes('Failed to fetch')) {
            message.error('网络连接失败，请检查网络设置');
          } else {
            message.error(`获取图片失败: ${error.message}`);
          }
        } else {
          message.error('获取图片失败，请重试');
        }
      } finally {
        setLoadingFileIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(fileId);
          return newSet;
        });
      }
    },
    [message]
  );

  // 页面初始化逻辑移除 - 不再自动设置预览文件

  // 处理文件选择（多选）
  const handleFileSelect = (file: FileItem) => {
    // 选择文件时清空识别结果
    setOcrResults({});
    setHasRecognized(false);

    setSelectedFiles((prev) => {
      const isSelected = prev.some((f) => f.id === file.id);
      if (isSelected) {
        // 取消选择
        return prev.filter((f) => f.id !== file.id);
      } else {
        // 添加选择
        const newSelected = [...prev, file];
        // 自动获取图片（如果是示例文件）
        if (file.id <= 3) {
          fetchIDCardImages(file.id);
        }
        return newSelected;
      }
    });
  };

  // 开始识别（统一：本地上传 + 示例文件）
  const handleStartRecognition = useCallback(async () => {
    const hasLocal = !!(uploadFrontFile && uploadBackFile);
    const totalCount = selectedFiles.length + (hasLocal ? 1 : 0);
    if (totalCount === 0) {
      message.warning('请先选择示例文件或上传正反面图片');
      return;
    }

    setIsRecognizing(true);
    setHasRecognized(false);

    const newResults: Record<number, OCRResult> = {};
    let successCount = 0;
    let failCount = 0;

    try {
      message.info(`开始识别 ${totalCount} 个文件...`);

      // 先识别本地上传
      if (hasLocal) {
        try {
          console.log('开始OCR识别：本地上传');
          const localData = await ocrUploadAPI(
            uploadFrontFile as File,
            uploadBackFile as File
          );
          newResults[0] = localData;
          successCount++;
        } catch (error) {
          console.error('本地上传OCR识别失败:', error);
          failCount++;
        }
      }

      // 再批量识别所选示例文件
      for (const file of selectedFiles) {
        try {
          console.log(`开始OCR识别，文件ID: ${file.id}`);

          const response = await ocrFileAPI({
            input_path_1: '',
            input_path_2: '',
            mode: file.id,
          });

          const data = response;
          console.log(`文件 ${file.name} OCR识别结果:`, data);

          newResults[file.id] = data;
          successCount++;
        } catch (error) {
          console.error(`文件 ${file.name} OCR识别失败:`, error);
          failCount++;
        }
      }

      setOcrResults(newResults);
      setHasRecognized(true);
      setActiveTab('fields');

      if (successCount > 0 && failCount === 0) {
        message.success(`全部 ${successCount} 个文件识别完成！`);
      } else if (successCount > 0 && failCount > 0) {
        message.warning(
          `${successCount} 个文件识别成功，${failCount} 个文件识别失败`
        );
      } else {
        message.error('所有文件识别失败，请重试');
      }
    } catch (error) {
      console.error('批量OCR识别失败:', error);
      message.error('识别失败，请重试');
    } finally {
      setIsRecognizing(false);
    }
  }, [selectedFiles, uploadFrontFile, uploadBackFile, message]);

  // 本地上传仅用于选择与预览，识别统一走 handleStartRecognition

  // 选择本地文件并预览
  const handleFrontChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setUploadFrontFile(file);
      if (file) {
        const reader = new FileReader();
        reader.onload = () => setUploadFrontPreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setUploadFrontPreview(null);
      }
    },
    []
  );

  const handleBackChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setUploadBackFile(file);
      if (file) {
        const reader = new FileReader();
        reader.onload = () => setUploadBackPreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setUploadBackPreview(null);
      }
    },
    []
  );

  // 清除本地文件选择
  const handleClearLocal = useCallback(() => {
    setUploadFrontFile(null);
    setUploadBackFile(null);
    setUploadFrontPreview(null);
    setUploadBackPreview(null);
    setOcrResults((prev) => {
      const entries = Object.entries(prev).filter(([k]) => k !== '0');
      return Object.fromEntries(entries) as Record<number, OCRResult>;
    });
  }, []);

  // 预览区取消选择示例文件
  const handleDeselectSample = useCallback((fileId: number) => {
    setSelectedFiles((prev) => prev.filter((f) => f.id !== fileId));
    setOcrResults((prev) => {
      const entries = Object.entries(prev).filter(
        ([k]) => parseInt(k) !== fileId
      );
      return Object.fromEntries(entries) as Record<number, OCRResult>;
    });
  }, []);

  // 导出结果为Excel（支持多个文件）
  const handleExport = () => {
    if (!hasRecognized || Object.keys(ocrResults).length === 0) {
      message.warning('请先完成识别');
      return;
    }

    try {
      const excelData: Record<string, string>[] = [];

      // 为每个识别结果创建一行数据
      Object.entries(ocrResults).forEach(([fileId, ocrResult]) => {
        const fileName =
          fileId === '0'
            ? '本地文件'
            : sampleFiles.find((f) => f.id === parseInt(fileId))?.name ||
              `文件${fileId}`;

        const baseExcelData: Record<string, string> = {
          文件名: fileName,
          '姓名（Họ và Tên）': ocrResult.full_name || '',
          '性别（Giới tính）': ocrResult.gender || '',
          '出生日期（Ngày sinh）': ocrResult.birth_date || '',
          '身份证号（Số CMND）	': ocrResult.id_number || '',
          '签发日期（Ngày cấp）': ocrResult.sign_date || '',
          '失效日期（Ngày hết hạn）': ocrResult.expire_date || '',
          '籍贯（Quê quán）': ocrResult.birth_location || '',
          '家庭住址（Địa chỉ Thường Trú）': `${ocrResult.address_location_1} ${ocrResult.address_location_2}`,
          '国籍（Dân tộc）': ocrResult.nation || '',
        };

        // 如果有qr_data字段且不为空，则添加到Excel数据中
        if (ocrResult.qr_data && ocrResult.qr_data.trim() !== '') {
          baseExcelData['二维码数据（QR Code）'] = ocrResult.qr_data;
        }

        excelData.push(baseExcelData);
      });

      // 创建工作簿
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();

      // 设置列宽 - 适应横向布局
      const baseColWidths = [
        { wch: 20 }, // 文件名
        { wch: 20 }, // 姓名
        { wch: 15 }, // 性别
        { wch: 15 }, // 出生日期
        { wch: 20 }, // 身份证号
        { wch: 15 }, // 签发日期
        { wch: 15 }, // 失效日期
        { wch: 20 }, // 籍贯
        { wch: 30 }, // 家庭住址
        { wch: 20 }, // 国籍
      ];

      // 检查是否有任何记录包含二维码数据
      const hasQrData = excelData.some((row) => row['二维码数据（QR Code）']);
      if (hasQrData) {
        baseColWidths.push({ wch: 30 }); // 二维码数据
      }

      worksheet['!cols'] = baseColWidths;

      // 添加工作表到工作簿
      XLSX.utils.book_append_sheet(workbook, worksheet, '身份证识别结果');

      // 生成文件名（包含时间戳）
      const now = new Date();
      const timestamp = now.toISOString().slice(0, 19).replace(/[-:T]/g, '');
      const fileName = `身份证识别结果_${timestamp}.xlsx`;

      // 导出文件
      XLSX.writeFile(workbook, fileName);

      message.success(`Excel文件导出成功！共导出 ${excelData.length} 条记录`);
    } catch (error) {
      console.error('导出Excel文件失败:', error);
      message.error('导出失败，请重试');
    }
  };

  // 识别结果表格列配置
  const columns = [
    {
      title: '字段',
      dataIndex: 'field',
      key: 'field',
      width: '40%',
    },
    {
      title: '识别结果',
      dataIndex: 'value',
      key: 'value',
      width: '60%',
    },
  ];

  // 右侧标签页配置
  const resultTabs: TabsProps['items'] = [
    {
      key: 'fields',
      label: (
        <span className="flex items-center gap-2">
          <FileTextOutlined />
          字段列表
        </span>
      ),
      children: (
        <div className="h-full">
          {!hasRecognized && !isRecognizing ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <IdcardOutlined className="text-6xl mb-4 text-gray-300" />
              <p className="text-lg">请点击&ldquo;开始识别&rdquo;以查看结果</p>
            </div>
          ) : isRecognizing ? (
            <div className="space-y-4">
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
            </div>
          ) : (
            <div className="h-full">
              {Object.keys(ocrResults).length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>暂无识别结果</p>
                </div>
              ) : Object.keys(ocrResults).length === 1 ? (
                // 单个文件结果显示
                <Table
                  columns={columns}
                  dataSource={getRecognitionResults(
                    Object.values(ocrResults)[0]
                  )}
                  pagination={false}
                  size="small"
                  className="h-full"
                />
              ) : (
                // 多个文件结果选项卡显示
                <div className="h-full">
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600">
                      已识别 {Object.keys(ocrResults).length}{' '}
                      个文件，点击选项卡查看详细结果
                    </p>
                  </div>
                  <Tabs
                    type="card"
                    size="small"
                    className="h-full"
                    items={Object.entries(ocrResults).map(
                      ([fileId, result]) => {
                        const fileName =
                          fileId === '0'
                            ? '本地文件'
                            : sampleFiles.find((f) => f.id === parseInt(fileId))
                                ?.name || `文件${fileId}`;
                        return {
                          key: fileId,
                          label: (
                            <span
                              className="text-xs truncate max-w-[80px]"
                              title={fileName}
                            >
                              {fileName}
                            </span>
                          ),
                          children: (
                            <div className="h-full overflow-auto">
                              <Table
                                columns={columns}
                                dataSource={getRecognitionResults(result)}
                                pagination={false}
                                size="small"
                              />
                            </div>
                          ),
                        };
                      }
                    )}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#f8f8f8] py-4 md:py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            身份证智能识别
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            上传身份证图片，智能识别身份信息
          </p>
        </div>

        {/* 三栏布局 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-12 xl:gap-16 items-stretch min-h-[600px] lg:min-h-[700px]">
          {/* 左侧 - 文件列表和操作按钮 */}
          <div className="md:col-span-1 lg:col-span-4 xl:col-span-3 h-full">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  文件列表
                </h2>
                {selectedFiles.length > 0 && (
                  <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    已选择 {selectedFiles.length} 个
                  </span>
                )}
              </div>

              {/* 本地上传 */}
              <div className="mb-6 p-3 border border-gray-200 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  本地上传
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-gray-600 mb-2">正面图片</div>
                    <Dragger
                      multiple={false}
                      accept="image/*"
                      showUploadList={false}
                      beforeUpload={(file) => {
                        const f = file as File;
                        setUploadFrontFile(f);
                        const reader = new FileReader();
                        reader.onload = () =>
                          setUploadFrontPreview(reader.result as string);
                        reader.readAsDataURL(f);
                        return false;
                      }}
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">拖拽图片到此或点击选择</p>
                      <p className="ant-upload-hint text-xs">
                        支持 JPG/PNG/JPEG/WebP
                      </p>
                    </Dragger>
                    <div className="text-xs text-gray-500 mt-2">
                      {uploadFrontFile
                        ? `已选：${uploadFrontFile.name}`
                        : '未选择'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-2">背面图片</div>
                    <Dragger
                      multiple={false}
                      accept="image/*"
                      showUploadList={false}
                      beforeUpload={(file) => {
                        const f = file as File;
                        setUploadBackFile(f);
                        const reader = new FileReader();
                        reader.onload = () =>
                          setUploadBackPreview(reader.result as string);
                        reader.readAsDataURL(f);
                        return false;
                      }}
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">拖拽图片到此或点击选择</p>
                      <p className="ant-upload-hint text-xs">
                        支持 JPG/PNG/JPEG/WebP
                      </p>
                    </Dragger>
                    <div className="text-xs text-gray-500 mt-2">
                      {uploadBackFile
                        ? `已选：${uploadBackFile.name}`
                        : '未选择'}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>需同时选择正反面图片</span>
                    {(uploadFrontFile || uploadBackFile) && (
                      <Button size="small" onClick={handleClearLocal}>
                        清除本地文件
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* 示例文件列表 */}
              <div className="space-y-2 mb-6">
                {sampleFiles.map((file) => {
                  const isSelected = selectedFiles.some(
                    (f) => f.id === file.id
                  );
                  return (
                    <div
                      key={file.id}
                      className={`p-3 rounded-lg border ${
                        isSelected
                          ? 'border-[#d32d26] bg-red-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => handleFileSelect(file)}
                        />
                        <IdcardOutlined className="text-gray-500" />
                        <span className="text-xs md:text-sm text-gray-700 truncate flex-1">
                          {file.name}
                        </span>
                        <Button
                          size="small"
                          onClick={() => handleFileSelect(file)}
                        >
                          {isSelected ? '取消' : '选择'}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 操作按钮 */}
              <div className="space-y-3 md:space-y-2 lg:space-y-3 mt-auto">
                <Button
                  type="primary"
                  icon={<PlayCircleOutlined />}
                  onClick={handleStartRecognition}
                  loading={isRecognizing}
                  disabled={
                    selectedFiles.length === 0 &&
                    !(uploadFrontFile && uploadBackFile)
                  }
                  size="large"
                  className="w-full h-10 md:h-12 text-sm md:text-base font-medium"
                >
                  {isRecognizing
                    ? `识别中(${selectedFiles.length + (uploadFrontFile && uploadBackFile ? 1 : 0)}个)...`
                    : `开始识别${selectedFiles.length + (uploadFrontFile && uploadBackFile ? 1 : 0) > 0 ? `(${selectedFiles.length + (uploadFrontFile && uploadBackFile ? 1 : 0)}个)` : ''}`}
                </Button>

                <Button
                  icon={<DownloadOutlined />}
                  onClick={handleExport}
                  disabled={!hasRecognized}
                  size="large"
                  className="w-full h-10 md:h-12 text-sm md:text-base"
                >
                  导出结果
                </Button>
              </div>
            </div>
          </div>

          {/* 中间 - 身份证预览区域 */}
          <div className="md:col-span-1 lg:col-span-4 xl:col-span-5 h-full">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <EyeOutlined />
                  身份证预览
                </h2>
                {selectedFiles.length > 1 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      已选择 {selectedFiles.length} 个文件
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1 overflow-y-auto">
                {uploadFrontPreview || uploadBackPreview ? (
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-3">
                      <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2 justify-between">
                        <span className="flex items-center gap-2">
                          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                            本地
                          </span>
                          本地上传
                        </span>
                        <Button size="small" onClick={handleClearLocal}>
                          清除
                        </Button>
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <h4 className="text-xs font-medium text-gray-600 mb-2">
                            正面
                          </h4>
                          <div className="aspect-[1.6/1] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                            {uploadFrontPreview ? (
                              <img
                                src={uploadFrontPreview}
                                alt="本地 正面"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-center px-2">
                                <IdcardOutlined className="text-xl text-gray-400 mb-1" />
                                <p className="text-xs text-gray-500">正面</p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-gray-600 mb-2">
                            背面
                          </h4>
                          <div className="aspect-[1.6/1] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                            {uploadBackPreview ? (
                              <img
                                src={uploadBackPreview}
                                alt="本地 背面"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-center px-2">
                                <IdcardOutlined className="text-xl text-gray-400 mb-1" />
                                <p className="text-xs text-gray-500">背面</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {selectedFiles.length > 0 && (
                      <div className="space-y-4">
                        {selectedFiles.map((file, index) => (
                          <div
                            key={file.id}
                            className="border border-gray-200 rounded-lg p-3"
                          >
                            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2 justify-between">
                              <span className="flex items-center gap-2">
                                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                                  {index + 1}
                                </span>
                                {file.name}
                              </span>
                              <Button
                                size="small"
                                onClick={() => handleDeselectSample(file.id)}
                              >
                                取消选择
                              </Button>
                            </h3>

                            {/* 正反面左右布局 */}
                            <div className="grid grid-cols-2 gap-3">
                              {/* 正面 */}
                              <div>
                                <h4 className="text-xs font-medium text-gray-600 mb-2">
                                  正面
                                </h4>
                                <div className="aspect-[1.6/1] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                                  {loadingFileIds.has(file.id) ? (
                                    <div className="text-center">
                                      <Spin size="small" />
                                      <p className="text-xs text-gray-500 mt-1">
                                        加载中...
                                      </p>
                                    </div>
                                  ) : file.frontImage ? (
                                    <img
                                      src={`data:image/jpeg;base64,${file.frontImage}`}
                                      alt={`${file.name} 正面`}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="text-center px-2">
                                      <IdcardOutlined className="text-xl text-gray-400 mb-1" />
                                      <p className="text-xs text-gray-500">
                                        正面
                                      </p>
                                      {file.id <= 3 && (
                                        <p className="text-xs text-red-500 mt-1">
                                          加载失败
                                        </p>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* 背面 */}
                              <div>
                                <h4 className="text-xs font-medium text-gray-600 mb-2">
                                  背面
                                </h4>
                                <div className="aspect-[1.6/1] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                                  {loadingFileIds.has(file.id) ? (
                                    <div className="text-center">
                                      <Spin size="small" />
                                      <p className="text-xs text-gray-500 mt-1">
                                        加载中...
                                      </p>
                                    </div>
                                  ) : file.backImage ? (
                                    <img
                                      src={`data:image/jpeg;base64,${file.backImage}`}
                                      alt={`${file.name} 背面`}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="text-center px-2">
                                      <IdcardOutlined className="text-xl text-gray-400 mb-1" />
                                      <p className="text-xs text-gray-500">
                                        背面
                                      </p>
                                      {file.id <= 3 && (
                                        <p className="text-xs text-red-500 mt-1">
                                          加载失败
                                        </p>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : selectedFiles.length > 0 ? (
                  <div className="space-y-4">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={file.id}
                        className="border border-gray-200 rounded-lg p-3"
                      >
                        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                            {index + 1}
                          </span>
                          {file.name}
                        </h3>

                        {/* 正反面左右布局 */}
                        <div className="grid grid-cols-2 gap-3">
                          {/* 正面 */}
                          <div>
                            <h4 className="text-xs font-medium text-gray-600 mb-2">
                              正面
                            </h4>
                            <div className="aspect-[1.6/1] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                              {loadingFileIds.has(file.id) ? (
                                <div className="text-center">
                                  <Spin size="small" />
                                  <p className="text-xs text-gray-500 mt-1">
                                    加载中...
                                  </p>
                                </div>
                              ) : file.frontImage ? (
                                <img
                                  src={`data:image/jpeg;base64,${file.frontImage}`}
                                  alt={`${file.name} 正面`}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="text-center px-2">
                                  <IdcardOutlined className="text-xl text-gray-400 mb-1" />
                                  <p className="text-xs text-gray-500">正面</p>
                                  {file.id <= 3 && (
                                    <p className="text-xs text-red-500 mt-1">
                                      加载失败
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* 背面 */}
                          <div>
                            <h4 className="text-xs font-medium text-gray-600 mb-2">
                              背面
                            </h4>
                            <div className="aspect-[1.6/1] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                              {loadingFileIds.has(file.id) ? (
                                <div className="text-center">
                                  <Spin size="small" />
                                  <p className="text-xs text-gray-500 mt-1">
                                    加载中...
                                  </p>
                                </div>
                              ) : file.backImage ? (
                                <img
                                  src={`data:image/jpeg;base64,${file.backImage}`}
                                  alt={`${file.name} 背面`}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="text-center px-2">
                                  <IdcardOutlined className="text-xl text-gray-400 mb-1" />
                                  <p className="text-xs text-gray-500">背面</p>
                                  {file.id <= 3 && (
                                    <p className="text-xs text-red-500 mt-1">
                                      加载失败
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-500 h-full">
                    <IdcardOutlined className="text-4xl md:text-6xl mb-4 text-gray-300" />
                    <p className="text-sm md:text-lg text-center px-4">
                      请选择要识别的身份证文件
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 右侧 - 识别结果区域 */}
          <div className="md:col-span-2 lg:col-span-4 xl:col-span-4 h-full">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 h-full flex flex-col">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                识别结果
              </h2>

              <div className="flex-1">
                <Tabs
                  activeKey={activeTab}
                  items={resultTabs}
                  onChange={setActiveTab}
                  className="h-full"
                  size="small"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
