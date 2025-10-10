'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Tag,
  Alert,
  Spin,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SafetyOutlined,
  TeamOutlined,
  LockOutlined,
} from '@ant-design/icons';
import {
  getPermissionsAPI,
  createPermissionAPI,
  updatePermissionAPI,
  deletePermissionAPI,
} from '@/apis/permission';
import type { Permission } from '@/types/auth';
import { getUserPermissionsAPI } from '@/apis/applications';

export default function PermissionPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPermission, setEditingPermission] = useState<Permission | null>(
    null
  );
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [form] = Form.useForm();

  // 获取权限列表
  const fetchPermissions = async () => {
    setLoading(true);
    try {
      const res = await getPermissionsAPI();
      setPermissions(res.permissions);
    } catch (error) {
      message.error('获取权限列表失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 检查用户权限
  const checkAuth = async () => {
    setAuthLoading(true);
    try {
      const res = await getUserPermissionsAPI();
      const roles = res.data.roles || [];
      // 检查是否有 admin 角色
      setIsAdmin(roles.includes('admin') || roles.includes('管理员'));
    } catch (error) {
      console.error('获取用户权限失败:', error);
      setIsAdmin(false);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    fetchPermissions();
  }, []);

  // 打开添加/编辑弹窗
  const handleOpenModal = (permission?: Permission) => {
    if (!isAdmin) {
      message.warning('只有管理员可以执行此操作');
      return;
    }
    if (permission) {
      setEditingPermission(permission);
      form.setFieldsValue({
        name: permission.name,
        description: permission.description || '',
      });
    } else {
      setEditingPermission(null);
      form.resetFields();
    }
    setModalVisible(true);
  };

  // 关闭弹窗
  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingPermission(null);
    form.resetFields();
  };

  // 提交表单
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      if (editingPermission) {
        // 编辑权限
        await updatePermissionAPI({
          id: editingPermission.id,
          name: values.name,
          description: values.description,
        });
        message.success('更新权限成功');
      } else {
        // 添加权限
        await createPermissionAPI({
          name: values.name,
          description: values.description,
        });
        message.success('添加权限成功');
      }

      handleCloseModal();
      fetchPermissions();
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message || '操作失败');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 删除权限
  const handleDelete = async (id: number) => {
    if (!isAdmin) {
      message.warning('只有管理员可以执行此操作');
      return;
    }
    setLoading(true);
    try {
      await deletePermissionAPI(id);
      message.success('删除权限成功');
      fetchPermissions();
    } catch (error) {
      message.error('删除权限失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 表格列定义
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '权限名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (text: string) => (
        <Space>
          <SafetyOutlined style={{ color: '#1890ff' }} />
          <Tag color="blue">{text}</Tag>
        </Space>
      ),
    },
    {
      title: '权限描述',
      dataIndex: 'description',
      key: 'description',
      render: (text: string | null) => text || '-',
    },
    {
      title: '使用该权限的角色',
      key: 'roles',
      width: 300,
      render: (_: unknown, record: Permission) => {
        const maxDisplay = 2; // 最多显示2个角色
        const roles = record.roles || [];
        const displayRoles = roles.slice(0, maxDisplay);
        const remainingCount = roles.length - maxDisplay;

        return (
          <Space wrap>
            {roles.length > 0 ? (
              <>
                <Tag color="orange" icon={<TeamOutlined />}>
                  {roles.length} 个角色
                </Tag>
                {displayRoles.map((role) => (
                  <Tag key={role.id} color="green">
                    {role.name}
                  </Tag>
                ))}
                {remainingCount > 0 && (
                  <Tag color="default">+{remainingCount}</Tag>
                )}
              </>
            ) : (
              <span style={{ color: '#999' }}>暂无角色使用</span>
            )}
          </Space>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      fixed: 'right' as const,
      render: (_: unknown, record: Permission) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleOpenModal(record)}
            disabled={!isAdmin}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个权限吗？"
            description="删除后无法恢复，请谨慎操作"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
            disabled={!isAdmin}
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              disabled={!isAdmin}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (authLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
        }}
      >
        <Spin size="large" tip="加载权限信息中..." />
      </div>
    );
  }

  return (
    <div>
      {!isAdmin && (
        <Alert
          message="权限不足"
          description="只有管理员可以管理权限。您可以查看权限列表，但无法进行添加、编辑、删除等操作。"
          type="warning"
          icon={<LockOutlined />}
          showIcon
          style={{ marginBottom: '16px' }}
        />
      )}
      <Card
        title={
          <Space>
            <SafetyOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
              权限管理
            </span>
          </Space>
        }
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleOpenModal()}
            disabled={!isAdmin}
          >
            添加权限
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={permissions}
          rowKey="id"
          loading={loading}
          scroll={{ x: 1200 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
        />
      </Card>

      {/* 添加/编辑权限弹窗 */}
      <Modal
        title={editingPermission ? '编辑权限' : '添加权限'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={handleCloseModal}
        okText="确定"
        cancelText="取消"
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical" style={{ marginTop: '20px' }}>
          <Form.Item
            label="权限名称"
            name="name"
            rules={[
              { required: true, message: '请输入权限名称' },
              { max: 50, message: '权限名称不能超过50个字符' },
            ]}
          >
            <Input placeholder="请输入权限名称，例如：app:read" />
          </Form.Item>
          <Form.Item
            label="权限描述"
            name="description"
            rules={[{ max: 200, message: '权限描述不能超过200个字符' }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="请输入权限描述"
              showCount
              maxLength={200}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
