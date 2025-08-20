'use client';

import React, { useState, useCallback } from 'react';
import { Button, Table, Tabs, Spin, Skeleton, App, Pagination } from 'antd';
import {
  PlayCircleOutlined,
  DownloadOutlined,
  FileTextOutlined,
  IdcardOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import type { TabsProps } from 'antd';
import * as XLSX from 'xlsx';

// API响应类型定义
interface IDCardResponse {
  file_1_base64: string; // 正面图
  file_2_base64: string; // 背面图
  [key: string]: string | number | boolean;
}

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
    { key: '1', field: '姓名', value: ocrData.full_name },
    { key: '2', field: '性别', value: ocrData.gender },
    { key: '3', field: '国家', value: ocrData.nation },
    { key: '4', field: '出生日期', value: ocrData.birth_date },
    { key: '5', field: '出生地点', value: ocrData.birth_location },
    { key: '6', field: '身份证号', value: ocrData.id_number },
    { key: '7', field: '地址1', value: ocrData.address_location_1 },
    { key: '8', field: '地址2', value: ocrData.address_location_2 },
    { key: '9', field: '签发日期', value: ocrData.sign_date },
    { key: '10', field: '有效期至', value: ocrData.expire_date },
  ];

  // 如果有qr_data字段且不为空，则添加到结果中
  if (ocrData.qr_data && ocrData.qr_data.trim() !== '') {
    baseResults.push({
      key: '11',
      field: '二维码数据',
      value: ocrData.qr_data,
    });
  }

  return baseResults;
};

export default function OCRRecognizePage() {
  const { message } = App.useApp();
  const [selectedFiles, setSelectedFiles] = useState<FileItem[]>([]);
  const [currentPreviewFile, setCurrentPreviewFile] = useState<FileItem | null>(
    null
  );
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [hasRecognized, setHasRecognized] = useState(false);
  const [activeTab, setActiveTab] = useState('fields');
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [ocrResults, setOcrResults] = useState<Record<number, OCRResult>>({});

  // 获取身份证图片
  const fetchIDCardImages = useCallback(
    async (fileId: number) => {
      setIsLoadingImages(true);
      const startTime = Date.now();

      try {
        console.log(`正在请求API，文件ID: ${fileId}`);

        const response = await fetch(
          `http://39.175.132.230:35001/v1/vietnamese_id_card_parse_get_image_only/?input_path_1=1&input_path_2=1&mode=${fileId}`,
          {
            method: 'POST',
            headers: {
              accept: 'application/json',
            },
            body: '', // 空请求体
          }
        );

        console.log(`API响应状态: ${response.status} ${response.statusText}`);

        if (response.status === 503) {
          throw new Error('服务暂时不可用，请稍后重试');
        }

        if (!response.ok) {
          throw new Error(
            `HTTP错误! 状态码: ${response.status} - ${response.statusText}`
          );
        }

        const data: IDCardResponse = await response.json();
        console.log('API响应数据:', data);

        // 计算已经过去的时间
        const elapsedTime = Date.now() - startTime;
        const minLoadingTime = 300; // 最小加载时间300ms

        // 如果加载时间不足300ms，则等待剩余时间
        if (elapsedTime < minLoadingTime) {
          const remainingTime = minLoadingTime - elapsedTime;
          await new Promise((resolve) => setTimeout(resolve, remainingTime));
        }

        // 更新当前预览文件，添加图片数据
        setCurrentPreviewFile((prev) =>
          prev
            ? {
                ...prev,
                frontImage: data.file_1_base64,
                backImage: data.file_2_base64,
              }
            : null
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
        setIsLoadingImages(false);
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
        const newSelected = prev.filter((f) => f.id !== file.id);

        // 如果取消选择的是当前预览文件，需要调整预览
        if (currentPreviewFile?.id === file.id) {
          if (newSelected.length > 0) {
            // 调整预览索引
            const newIndex = Math.min(
              currentPreviewIndex,
              newSelected.length - 1
            );
            setCurrentPreviewIndex(newIndex);
            setCurrentPreviewFile(newSelected[newIndex]);
            // 自动获取新预览文件的图片
            if (newSelected[newIndex].id <= 3) {
              fetchIDCardImages(newSelected[newIndex].id);
            }
          } else {
            // 如果没有选中文件了，清除预览
            setCurrentPreviewFile(null);
            setCurrentPreviewIndex(0);
          }
        } else {
          // 如果取消的不是当前预览文件，需要更新索引
          const currentFileIndex = newSelected.findIndex(
            (f) => f.id === currentPreviewFile?.id
          );
          if (currentFileIndex >= 0) {
            setCurrentPreviewIndex(currentFileIndex);
          }
        }

        return newSelected;
      } else {
        // 添加选择
        const newSelected = [...prev, file];
        // 如果是第一个选中的文件，自动设为预览文件
        if (prev.length === 0) {
          setCurrentPreviewFile(file);
          setCurrentPreviewIndex(0);
          // 自动获取图片
          if (file.id <= 3) {
            fetchIDCardImages(file.id);
          }
        }
        return newSelected;
      }
    });
  };

  // 处理分页切换
  const handlePageChange = (page: number) => {
    const index = page - 1; // 分页从1开始，索引从0开始
    if (index >= 0 && index < selectedFiles.length) {
      // 切换预览时清空识别结果
      setOcrResults({});
      setHasRecognized(false);

      setCurrentPreviewIndex(index);
      const file = selectedFiles[index];
      setCurrentPreviewFile(file);

      // 如果是示例文件，自动获取图片
      if (file.id <= 3) {
        fetchIDCardImages(file.id);
      }
    }
  };

  // 开始识别（批量）
  const handleStartRecognition = useCallback(async () => {
    if (selectedFiles.length === 0) {
      message.warning('请先选择要识别的文件');
      return;
    }

    setIsRecognizing(true);
    setHasRecognized(false);

    const newResults: Record<number, OCRResult> = {};
    let successCount = 0;
    let failCount = 0;

    try {
      message.info(`开始识别 ${selectedFiles.length} 个文件...`);

      // 批量识别所选文件
      for (const file of selectedFiles) {
        try {
          console.log(`开始OCR识别，文件ID: ${file.id}`);

          const response = await fetch(
            `http://39.175.132.230:35001/v1/vietnamese_id_card_parse/?input_path_1=1&input_path_2=1&mode=${file.id}`,
            {
              method: 'POST',
              headers: {
                accept: 'application/json',
              },
              body: '', // 空请求体
            }
          );

          if (!response.ok) {
            throw new Error(
              `HTTP错误! 状态码: ${response.status} - ${response.statusText}`
            );
          }

          const data: OCRResult = await response.json();
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
  }, [selectedFiles, message]);

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
          sampleFiles.find((f) => f.id === parseInt(fileId))?.name ||
          `文件${fileId}`;

        const baseExcelData: Record<string, string> = {
          文件名: fileName,
          姓名: ocrResult.full_name || '',
          性别: ocrResult.gender || '',
          民族: ocrResult.nation || '',
          出生日期: ocrResult.birth_date || '',
          出生地点: ocrResult.birth_location || '',
          身份证号: ocrResult.id_number || '',
          地址1: ocrResult.address_location_1 || '',
          地址2: ocrResult.address_location_2 || '',
          签发日期: ocrResult.sign_date || '',
          有效期至: ocrResult.expire_date || '',
        };

        // 如果有qr_data字段且不为空，则添加到Excel数据中
        if (ocrResult.qr_data && ocrResult.qr_data.trim() !== '') {
          baseExcelData['二维码数据'] = ocrResult.qr_data;
        }

        excelData.push(baseExcelData);
      });

      // 创建工作簿
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();

      // 设置列宽 - 适应横向布局
      const baseColWidths = [
        { wch: 20 }, // 文件名
        { wch: 15 }, // 姓名
        { wch: 10 }, // 性别
        { wch: 10 }, // 民族
        { wch: 15 }, // 出生日期
        { wch: 20 }, // 出生地点
        { wch: 20 }, // 身份证号
        { wch: 25 }, // 地址1
        { wch: 25 }, // 地址2
        { wch: 15 }, // 签发日期
        { wch: 15 }, // 有效期至
      ];

      // 检查是否有任何记录包含二维码数据
      const hasQrData = excelData.some((row) => row['二维码数据']);
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
                          sampleFiles.find((f) => f.id === parseInt(fileId))
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
    // {
    //   key: 'excel',
    //   label: (
    //     <span className="flex items-center gap-2">
    //       <TableOutlined />
    //       Excel预览
    //     </span>
    //   ),
    //   children: (
    //     <div className="h-full">
    //       {!hasRecognized && !isRecognizing ? (
    //         <div className="flex flex-col items-center justify-center h-full text-gray-500">
    //           <TableOutlined className="text-6xl mb-4 text-gray-300" />
    //           <p className="text-lg">请点击&ldquo;开始识别&rdquo;以查看表格</p>
    //         </div>
    //       ) : isRecognizing ? (
    //         <div className="space-y-4">
    //           <Skeleton active />
    //           <Skeleton active />
    //         </div>
    //       ) : (
    //         <Table
    //           columns={excelColumns}
    //           dataSource={getExcelData(ocrResult)}
    //           pagination={false}
    //           size="small"
    //           scroll={{ x: 'max-content' }}
    //           className="h-full"
    //         />
    //       )}
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="min-h-screen bg-[#f8f8f8] py-4 md:py-8">
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

              {/* 示例文件列表 */}
              <div className="space-y-2 mb-6">
                {sampleFiles.map((file) => {
                  const isSelected = selectedFiles.some(
                    (f) => f.id === file.id
                  );
                  return (
                    <div key={file.id}>
                      <div
                        onClick={() => handleFileSelect(file)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? 'border-[#d32d26] bg-red-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <IdcardOutlined className="text-gray-500" />
                            {isSelected && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            )}
                          </div>
                          <span className="text-xs md:text-sm text-gray-700 truncate flex-1">
                            {file.name}
                          </span>
                        </div>
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
                  disabled={selectedFiles.length === 0}
                  size="large"
                  className="w-full h-10 md:h-12 text-sm md:text-base font-medium"
                >
                  {isRecognizing
                    ? `识别中(${selectedFiles.length}个)...`
                    : `开始识别${selectedFiles.length > 0 ? `(${selectedFiles.length}个)` : ''}`}
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
                      {currentPreviewIndex + 1} / {selectedFiles.length}
                    </span>
                    <Pagination
                      simple
                      size="small"
                      current={currentPreviewIndex + 1}
                      total={selectedFiles.length}
                      pageSize={1}
                      onChange={handlePageChange}
                      showSizeChanger={false}
                    />
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col">
                {currentPreviewFile ? (
                  <div className="flex-1 space-y-4 md:space-y-6">
                    {/* 正面 */}
                    <div className="flex-1">
                      <h3 className="text-sm md:text-base font-medium text-gray-700 mb-2 md:mb-3">
                        正面 - {currentPreviewFile.name}
                      </h3>
                      <div className="aspect-[1.6/1] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                        {isLoadingImages ? (
                          <div className="text-center">
                            <Spin size="large" />
                            <p className="text-sm text-gray-500 mt-2">
                              正在加载图片...
                            </p>
                          </div>
                        ) : currentPreviewFile.frontImage ? (
                          <img
                            src={`data:image/jpeg;base64,${currentPreviewFile.frontImage}`}
                            alt="身份证正面"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center px-4">
                            <IdcardOutlined className="text-3xl md:text-4xl text-gray-400 mb-2" />
                            <p className="text-sm md:text-base text-gray-500">
                              身份证正面
                            </p>
                            <p className="text-xs md:text-sm text-gray-400 truncate">
                              {currentPreviewFile.name}
                            </p>
                            {currentPreviewFile.id <= 3 && (
                              <p className="text-xs text-red-500 mt-2">
                                图片加载失败，请点击&ldquo;重新加载图片&rdquo;
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 背面 */}
                    <div className="flex-1">
                      <h3 className="text-sm md:text-base font-medium text-gray-700 mb-2 md:mb-3">
                        背面 - {currentPreviewFile.name}
                      </h3>
                      <div className="aspect-[1.6/1] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                        {isLoadingImages ? (
                          <div className="text-center">
                            <Spin size="large" />
                            <p className="text-sm text-gray-500 mt-2">
                              正在加载图片...
                            </p>
                          </div>
                        ) : currentPreviewFile.backImage ? (
                          <img
                            src={`data:image/jpeg;base64,${currentPreviewFile.backImage}`}
                            alt="身份证背面"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center px-4">
                            <IdcardOutlined className="text-3xl md:text-4xl text-gray-400 mb-2" />
                            <p className="text-sm md:text-base text-gray-500">
                              身份证背面
                            </p>
                            <p className="text-xs md:text-sm text-gray-400 truncate">
                              {currentPreviewFile.name}
                            </p>
                            {currentPreviewFile.id <= 3 && (
                              <p className="text-xs text-red-500 mt-2">
                                图片加载失败，请点击&ldquo;重新加载图片&rdquo;
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
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
