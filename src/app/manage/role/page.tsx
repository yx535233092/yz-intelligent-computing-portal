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
  Transfer,
  Spin,
  Alert,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  TeamOutlined,
  SafetyOutlined,
  LockOutlined,
} from '@ant-design/icons';
import {
  getRolesAPI,
  createRoleAPI,
  updateRoleAPI,
  deleteRoleAPI,
  assignPermissionsToRoleAPI,
} from '@/apis/role';
import type { Role, Permission } from '@/types/auth';
import { getPermissionsAPI } from '@/apis/permission';
import { getUserPermissionsAPI } from '@/apis/applications';

export default function RolePage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [assigningRole, setAssigningRole] = useState<Role | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [form] = Form.useForm();

  // 获取角色列表
  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await getRolesAPI();
      setRoles(res.roles);
    } catch (error) {
      message.error('获取角色列表失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 获取权限列表
  const fetchPermissions = async () => {
    try {
      const res = await getPermissionsAPI();
      setPermissions(res.permissions);
    } catch (error) {
      console.error('获取权限列表失败:', error);
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
    fetchRoles();
    fetchPermissions();
  }, []);

  // 打开添加/编辑弹窗
  const handleOpenModal = (role?: Role) => {
    if (!isAdmin) {
      message.warning('只有管理员可以执行此操作');
      return;
    }
    if (role) {
      setEditingRole(role);
      form.setFieldsValue({
        name: role.name,
        description: role.description || '',
      });
    } else {
      setEditingRole(null);
      form.resetFields();
    }
    setModalVisible(true);
  };

  // 关闭弹窗
  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingRole(null);
    form.resetFields();
  };

  // 提交表单
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      if (editingRole) {
        // 编辑角色
        await updateRoleAPI({
          id: editingRole.id,
          name: values.name,
          description: values.description,
        });
        message.success('更新角色成功');
      } else {
        // 添加角色
        await createRoleAPI({
          name: values.name,
          description: values.description,
        });
        message.success('添加角色成功');
      }

      handleCloseModal();
      fetchRoles();
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message || '操作失败');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 删除角色
  const handleDelete = async (id: number) => {
    if (!isAdmin) {
      message.warning('只有管理员可以执行此操作');
      return;
    }
    setLoading(true);
    try {
      await deleteRoleAPI(id);
      message.success('删除角色成功');
      fetchRoles();
    } catch (error) {
      message.error('删除角色失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 打开权限分配弹窗
  const handleOpenPermissionModal = (role: Role) => {
    if (!isAdmin) {
      message.warning('只有管理员可以执行此操作');
      return;
    }
    setAssigningRole(role);
    // 设置已选中的权限
    const permissionIds = role.permissions?.map((p) => p.id) || [];
    setSelectedPermissions(permissionIds);
    setPermissionModalVisible(true);
  };

  // 关闭权限分配弹窗
  const handleClosePermissionModal = () => {
    setPermissionModalVisible(false);
    setAssigningRole(null);
    setSelectedPermissions([]);
  };

  // 提交权限分配
  const handleAssignPermissions = async () => {
    if (!assigningRole) return;

    setLoading(true);
    try {
      await assignPermissionsToRoleAPI({
        roleId: assigningRole.id,
        permissionIds: selectedPermissions,
      });
      message.success('权限分配成功');
      handleClosePermissionModal();
      fetchRoles();
    } catch (error) {
      message.error('权限分配失败');
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
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <TeamOutlined style={{ color: '#52c41a' }} />
          <Tag color="green">{text}</Tag>
        </Space>
      ),
    },
    {
      title: '角色描述',
      dataIndex: 'description',
      key: 'description',
      render: (text: string | null) => text || '-',
    },
    {
      title: '权限数量',
      key: 'permissionCount',
      width: 120,
      render: (_: unknown, record: Role) => (
        <Tag color="blue">{record.permissions?.length || 0} 个权限</Tag>
      ),
    },
    {
      title: '拥有的权限',
      key: 'permissions',
      render: (_: unknown, record: Role) => {
        const maxDisplay = 3; // 最多显示3个权限
        const permissions = record.permissions || [];
        const displayPermissions = permissions.slice(0, maxDisplay);
        const remainingCount = permissions.length - maxDisplay;

        return (
          <Space wrap>
            {permissions.length > 0 ? (
              <>
                {displayPermissions.map((permission) => (
                  <Tag
                    key={permission.id}
                    color="purple"
                    icon={<SafetyOutlined />}
                  >
                    {permission.name}
                  </Tag>
                ))}
                {remainingCount > 0 && (
                  <Tag color="default">+{remainingCount}</Tag>
                )}
              </>
            ) : (
              <span style={{ color: '#999' }}>暂无权限</span>
            )}
          </Space>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 280,
      fixed: 'right' as const,
      render: (_: unknown, record: Role) => (
        <Space>
          <Button
            type="link"
            icon={<SafetyOutlined />}
            onClick={() => handleOpenPermissionModal(record)}
            disabled={!isAdmin}
          >
            分配权限
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleOpenModal(record)}
            disabled={!isAdmin}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个角色吗？"
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
          description="只有管理员可以管理角色。您可以查看角色列表，但无法进行添加、编辑、删除、分配权限等操作。"
          type="warning"
          icon={<LockOutlined />}
          showIcon
          style={{ marginBottom: '16px' }}
        />
      )}
      <Card
        title={
          <Space>
            <TeamOutlined style={{ fontSize: '20px', color: '#52c41a' }} />
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
              角色管理
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
            添加角色
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={roles}
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

      {/* 添加/编辑角色弹窗 */}
      <Modal
        title={editingRole ? '编辑角色' : '添加角色'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={handleCloseModal}
        okText="确定"
        cancelText="取消"
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical" style={{ marginTop: '20px' }}>
          <Form.Item
            label="角色名称"
            name="name"
            rules={[
              { required: true, message: '请输入角色名称' },
              { max: 50, message: '角色名称不能超过50个字符' },
            ]}
          >
            <Input placeholder="请输入角色名称，例如：管理员、普通用户" />
          </Form.Item>
          <Form.Item
            label="角色描述"
            name="description"
            rules={[{ max: 200, message: '角色描述不能超过200个字符' }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="请输入角色描述"
              showCount
              maxLength={200}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 权限分配弹窗 */}
      <Modal
        title={
          <Space>
            <SafetyOutlined />
            <span>为角色&quot;{assigningRole?.name}&quot;分配权限</span>
          </Space>
        }
        open={permissionModalVisible}
        onOk={handleAssignPermissions}
        onCancel={handleClosePermissionModal}
        okText="确定"
        cancelText="取消"
        confirmLoading={loading}
        width={700}
      >
        {permissions.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '40px',
              color: '#999',
            }}
          >
            <Spin />
            <p style={{ marginTop: '16px' }}>加载权限列表中...</p>
          </div>
        ) : (
          <div style={{ marginTop: '20px' }}>
            <Transfer
              dataSource={permissions.map((p) => ({
                key: String(p.id),
                title: p.name,
                description: p.description || '',
              }))}
              titles={['可用权限', '已分配权限']}
              targetKeys={selectedPermissions.map(String)}
              onChange={(targetKeys) => {
                setSelectedPermissions(targetKeys.map(Number));
              }}
              render={(item) => (
                <div>
                  <div style={{ fontWeight: 'bold' }}>{item.title}</div>
                  {item.description && (
                    <div style={{ fontSize: '12px', color: '#999' }}>
                      {item.description}
                    </div>
                  )}
                </div>
              )}
              listStyle={{
                width: 300,
                height: 400,
              }}
              showSearch
              filterOption={(inputValue, item) =>
                item.title?.toLowerCase().includes(inputValue.toLowerCase()) ||
                item.description
                  ?.toLowerCase()
                  .includes(inputValue.toLowerCase())
              }
            />
            <div style={{ marginTop: '16px', color: '#666' }}>
              <Space>
                <span>已选择：</span>
                <Tag color="blue">{selectedPermissions.length} 个权限</Tag>
              </Space>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
