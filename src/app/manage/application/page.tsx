'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  message,
  Popconfirm,
  Card,
  Switch,
  InputNumber,
  Tag,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import {
  getApplicationsAPI,
  createApplicationAPI,
  updateApplicationAPI,
  deleteApplicationAPI,
} from '@/apis/applications';
import type { ApplicationData } from '@/types/application';

const ApplicationManage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApplicationData[]>([]);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [searchText, setSearchText] = useState('');

  // 模态框状态
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('新建应用');
  const [currentRecord, setCurrentRecord] = useState<ApplicationData | null>(null);
  const [appType, setAppType] = useState('外部应用');
  const [needsAuth, setNeedsAuth] = useState(false);
  const [form] = Form.useForm();

  // 获取数据
  const fetchData = async (page = 1, pageSize = 10, name = '') => {
    setLoading(true);
    try {
      const res = await getApplicationsAPI({ page, pageSize, name });
      setData(res.data);
      setTotal(res.total);
      setPagination({ current: page, pageSize });
    } catch (error) {
      message.error('获取应用列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 处理搜索
  const handleSearch = () => {
    fetchData(1, pagination.pageSize, searchText);
  };

  // 处理表格变动
  const handleTableChange = (newPagination: any) => {
    fetchData(newPagination.current, newPagination.pageSize, searchText);
  };

  // 打开新建模态框
  const handleAdd = () => {
    setModalTitle('新建应用');
    setCurrentRecord(null);
    form.resetFields();
    setAppType('外部应用');
    setNeedsAuth(false);
    // 设置一些默认值
    form.setFieldsValue({
      type: '外部应用',
      sceneCategory: '智能问答',
      industryTag: '通用',
      icon: 'DataAnalysis',
      sortOrder: 0,
      needsAuth: false,
    });
    setIsModalOpen(true);
  };

  // 打开编辑模态框
  const handleEdit = (record: ApplicationData) => {
    setModalTitle('编辑应用');
    setCurrentRecord(record);
    setAppType(record.type);
    setNeedsAuth(record.needsAuth || false);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  // 处理删除
  const handleDelete = async (id: number) => {
    try {
      await deleteApplicationAPI(id);
      message.success('删除成功');
      fetchData(pagination.current, pagination.pageSize, searchText);
    } catch (error) {
      message.error('删除失败');
    }
  };

  // 提交表单
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      
      // 如果是内部应用且没填 route，设置默认
      if (values.type === '内部应用' && !values.route) {
        values.route = '/portal/app/auto';
      } else if (values.type === '外部应用') {
         // 外部应用统一走通用渲染页，ID 在路由 API 里处理
         values.route = `/portal/app/placeholder`; 
      }

      if (currentRecord) {
        await updateApplicationAPI(currentRecord.id, values);
        message.success('更新成功');
      } else {
        await createApplicationAPI(values);
        message.success('创建成功');
      }
      setIsModalOpen(false);
      fetchData(pagination.current, pagination.pageSize, searchText);
    } catch (error) {
      console.error(error);
    }
  };

  const columns: ColumnsType<ApplicationData> = [
    {
      title: '排序',
      dataIndex: 'sortOrder',
      width: 60,
      sorter: (a, b) => a.sortOrder - b.sortOrder,
    },
    {
      title: '应用名称',
      dataIndex: 'name',
      width: 140,
      ellipsis: true,
    },
    {
      title: '应用类型',
      dataIndex: 'type',
      width: 90,
      render: (type) => (
        <Tag color={type === '内部应用' ? 'blue' : 'green'}>{type}</Tag>
      )
    },
    {
      title: '认证',
      dataIndex: 'needsAuth',
      width: 70,
      render: (val) => (val ? <Tag color="red">是</Tag> : <Tag>否</Tag>)
    },
    {
      title: '匿名',
      dataIndex: 'isPublic',
      width: 70,
      render: (val) => (val ? <Tag color="cyan">允许</Tag> : <Tag>禁止</Tag>)
    },
    {
      title: '目标地址',
      dataIndex: 'url',
      ellipsis: true,
      render: (url, record) => url || record.route
    },
    {
      title: '场景分类',
      dataIndex: 'sceneCategory',
      width: 100,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      width: 160,
      render: (text) => new Date(text).toLocaleString('zh-CN', { hour12: false }).substring(0, 16),
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确认删除该应用吗?"
            onConfirm={() => handleDelete(record.id)}
            okText="是"
            cancelText="否"
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card title="应用管理" bordered={false} className="h-full">
      <div className="mb-4 flex justify-between">
        <Space>
          <Input
            placeholder="搜索应用"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={handleSearch}
            allowClear
            style={{ width: 180 }}
          />
          <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
            搜索
          </Button>
        </Space>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新建应用
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        size="small"
        pagination={{
          ...pagination,
          total,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
        loading={loading}
        onChange={handleTableChange}
      />

      <Modal
        title={modalTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        width={700}
      >
        <Form form={form} layout="vertical">
          <Space style={{ display: 'flex' }} align="start">
            <Form.Item
              name="name"
              label="应用名称"
              style={{ width: 320 }}
              rules={[{ required: true, message: '请输入应用名称' }]}
            >
              <Input />
            </Form.Item>
            
            <Form.Item
              name="sortOrder"
              label="显示顺序"
              style={{ width: 120 }}
              rules={[{ required: true }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="type"
              label="应用类型"
              style={{ width: 200 }}
              rules={[{ required: true }]}
            >
              <Select onChange={(value) => setAppType(value)}>
                <Select.Option value="内部应用">内部应用 (系统内置)</Select.Option>
                <Select.Option value="外部应用">外部应用 (Iframe加载)</Select.Option>
              </Select>
            </Form.Item>
          </Space>
          
          <Space style={{ display: 'flex' }} align="start">
            <Form.Item
              name="sceneCategory"
              label="场景分类"
              style={{ width: 320 }}
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="智能问答">智能问答</Select.Option>
                <Select.Option value="智能文档">智能文档</Select.Option>
                <Select.Option value="智能问数">智能问数</Select.Option>
                <Select.Option value="智能办公">智能办公</Select.Option>
                <Select.Option value="其他">其他</Select.Option>
              </Select>
            </Form.Item>

             <Form.Item
              name="industryTag"
              label="行业标签"
              style={{ width: 330 }}
            >
              <Input placeholder="例如: 金融, 医疗, 通用" />
            </Form.Item>
          </Space>

          <Space style={{ display: 'flex' }} align="start">
            <Form.Item
              name="icon"
              label="图标Key (Antd Icon)"
              style={{ width: 320 }}
            >
              <Input placeholder="例如: MessageOutlined" />
            </Form.Item>

            <Form.Item
              name="needsAuth"
              label="开启身份认证 (浩鲸/三方)"
              valuePropName="checked"
              style={{ width: 220 }}
            >
              <Switch onChange={(checked) => setNeedsAuth(checked)} />
            </Form.Item>

            <Form.Item
              name="isPublic"
              label="允许匿名访问"
              valuePropName="checked"
              style={{ width: 110 }}
            >
              <Switch />
            </Form.Item>
          </Space>

          {appType === '内部应用' ? (
            <Form.Item
              name="route"
              label="内部路由地址"
              rules={[{ required: true, message: '请输入内部路由' }]}
              extra="例如: /portal/service/service-app/ocr-recognize"
            >
              <Input />
            </Form.Item>
          ) : (
            <Form.Item
              name="url"
              label="目标地址 (URL)"
              rules={[{ required: true, message: '请输入应用地址' }]}
              extra="支持 {hostname} 占位符"
            >
              <Input />
            </Form.Item>
          )}

          {needsAuth && (
            <Space style={{ display: 'flex' }} align="start">
              <Form.Item
                name="username"
                label="认证用户名"
                style={{ width: 320 }}
                rules={[{ required: true, message: '请输入用户名' }]}
              >
                <Input />
              </Form.Item>
              
              <Form.Item
                name="password"
                label="认证密码"
                style={{ width: 330 }}
                rules={[{ required: true, message: '请输入密码' }]}
              >
                <Input.Password />
              </Form.Item>
            </Space>
          )}

          <Form.Item
            name="description"
            label="应用描述"
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ApplicationManage;
