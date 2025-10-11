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
  Switch,
  Tooltip,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  TeamOutlined,
  LockOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import {
  getUsersAPI,
  createUserAPI,
  updateUserAPI,
  deleteUserAPI,
  assignRolesToUserAPI,
} from '@/apis/users';
import { getRolesAPI } from '@/apis/role';
import type { User, Role } from '@/types/auth';
import { getUserPermissionsAPI } from '@/apis/applications';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [assigningUser, setAssigningUser] = useState<User | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [form] = Form.useForm();

  // 获取用户列表
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsersAPI();
      setUsers(res.users);
    } catch (error) {
      message.error('获取用户列表失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 获取角色列表
  const fetchRoles = async () => {
    try {
      const res = await getRolesAPI();
      setRoles(res.roles);
    } catch (error) {
      console.error('获取角色列表失败:', error);
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
    fetchUsers();
    fetchRoles();
  }, []);

  // 打开添加/编辑弹窗
  const handleOpenModal = (user?: User) => {
    if (!isAdmin) {
      message.warning('只有管理员可以执行此操作');
      return;
    }
    if (user) {
      setEditingUser(user);
      form.setFieldsValue({
        username: user.username,
        password: '', // 编辑时不显示密码
        isActive: user.isActive,
      });
    } else {
      setEditingUser(null);
      form.resetFields();
    }
    setModalVisible(true);
  };

  // 关闭弹窗
  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingUser(null);
    form.resetFields();
  };

  // 提交表单
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      if (editingUser) {
        // 编辑用户
        const updateData: {
          id: number;
          username?: string;
          password?: string;
          isActive?: boolean;
        } = {
          id: editingUser.id,
        };

        if (values.username !== editingUser.username) {
          updateData.username = values.username;
        }
        if (values.password) {
          updateData.password = values.password;
        }
        if (values.isActive !== editingUser.isActive) {
          updateData.isActive = values.isActive;
        }

        await updateUserAPI(updateData);
        message.success('更新用户成功');
      } else {
        // 添加用户
        await createUserAPI({
          username: values.username,
          password: values.password,
        });
        message.success('添加用户成功');
      }

      handleCloseModal();
      fetchUsers();
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message || '操作失败');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 删除用户
  const handleDelete = async (id: number) => {
    if (!isAdmin) {
      message.warning('只有管理员可以执行此操作');
      return;
    }
    setLoading(true);
    try {
      await deleteUserAPI(id);
      message.success('删除用户成功');
      fetchUsers();
    } catch (error) {
      message.error('删除用户失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 切换用户状态
  const handleToggleStatus = async (user: User) => {
    if (!isAdmin) {
      message.warning('只有管理员可以执行此操作');
      return;
    }
    try {
      await updateUserAPI({
        id: user.id,
        isActive: !user.isActive,
      });
      message.success(`已${user.isActive ? '禁用' : '启用'}用户`);
      fetchUsers();
    } catch (error) {
      message.error('更新用户状态失败');
      console.error(error);
    }
  };

  // 打开角色分配弹窗
  const handleOpenRoleModal = (user: User) => {
    if (!isAdmin) {
      message.warning('只有管理员可以执行此操作');
      return;
    }
    setAssigningUser(user);
    // 设置已选中的角色
    const roleIds = user.roles?.map((r) => r.id) || [];
    setSelectedRoles(roleIds);
    setRoleModalVisible(true);
  };

  // 关闭角色分配弹窗
  const handleCloseRoleModal = () => {
    setRoleModalVisible(false);
    setAssigningUser(null);
    setSelectedRoles([]);
  };

  // 提交角色分配
  const handleAssignRoles = async () => {
    if (!assigningUser) return;

    setLoading(true);
    try {
      await assignRolesToUserAPI({
        userId: assigningUser.id,
        roleIds: selectedRoles,
      });
      message.success('角色分配成功');
      handleCloseRoleModal();
      fetchUsers();
    } catch (error) {
      message.error('角色分配失败');
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
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      render: (text: string) => (
        <Space>
          <UserOutlined style={{ color: '#1890ff' }} />
          <strong>{text}</strong>
        </Space>
      ),
    },
    {
      title: '状态',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 120,
      render: (isActive: boolean, record: User) => (
        <Tooltip title={isActive ? '点击禁用' : '点击启用'}>
          <Switch
            checked={isActive}
            onChange={() => handleToggleStatus(record)}
            checkedChildren={<CheckCircleOutlined />}
            unCheckedChildren={<CloseCircleOutlined />}
            disabled={!isAdmin}
          />
        </Tooltip>
      ),
    },
    {
      title: '角色',
      key: 'roles',
      render: (_: unknown, record: User) => {
        const maxDisplay = 2;
        const userRoles = record.roles || [];
        const displayRoles = userRoles.slice(0, maxDisplay);
        const remainingCount = userRoles.length - maxDisplay;

        return (
          <Space wrap>
            {userRoles.length > 0 ? (
              <>
                {displayRoles.map((role) => (
                  <Tag key={role.id} color="green" icon={<TeamOutlined />}>
                    {role.name}
                  </Tag>
                ))}
                {remainingCount > 0 && (
                  <Tag color="default">+{remainingCount}</Tag>
                )}
              </>
            ) : (
              <span style={{ color: '#999' }}>未分配角色</span>
            )}
          </Space>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (date: string | Date) => {
        const d = new Date(date);
        return d.toLocaleString('zh-CN');
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 180,
      render: (date: string | Date) => {
        const d = new Date(date);
        return d.toLocaleString('zh-CN');
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 280,
      fixed: 'right' as const,
      render: (_: unknown, record: User) => (
        <Space>
          <Button
            type="link"
            icon={<TeamOutlined />}
            onClick={() => handleOpenRoleModal(record)}
            disabled={!isAdmin}
          >
            分配角色
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
            title="确定要删除这个用户吗？"
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
          description="只有管理员可以管理用户。您可以查看用户列表，但无法进行添加、编辑、删除、分配角色等操作。"
          type="warning"
          icon={<LockOutlined />}
          showIcon
          style={{ marginBottom: '16px' }}
        />
      )}
      <Card
        title={
          <Space>
            <UserOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
              用户管理
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
            添加用户
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={users}
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

      {/* 添加/编辑用户弹窗 */}
      <Modal
        title={
          <Space>
            <UserOutlined />
            <span>{editingUser ? '编辑用户' : '添加用户'}</span>
          </Space>
        }
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={handleCloseModal}
        okText="确定"
        cancelText="取消"
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical" style={{ marginTop: '20px' }}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, message: '用户名至少3个字符' },
              { max: 50, message: '用户名不能超过50个字符' },
              {
                pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
                message: '用户名只能包含字母、数字、下划线和中文',
              },
            ]}
          >
            <Input
              placeholder="请输入用户名"
              prefix={<UserOutlined />}
              disabled={!!editingUser}
            />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={
              editingUser
                ? [
                    { min: 6, message: '密码至少6个字符' },
                    { max: 100, message: '密码不能超过100个字符' },
                  ]
                : [
                    { required: true, message: '请输入密码' },
                    { min: 6, message: '密码至少6个字符' },
                    { max: 100, message: '密码不能超过100个字符' },
                  ]
            }
          >
            <Input.Password
              placeholder={editingUser ? '留空则不修改密码' : '请输入密码'}
              prefix={<LockOutlined />}
            />
          </Form.Item>
          {editingUser && (
            <Form.Item label="用户状态" name="isActive" valuePropName="checked">
              <Switch checkedChildren="启用" unCheckedChildren="禁用" />
            </Form.Item>
          )}
        </Form>
      </Modal>

      {/* 角色分配弹窗 */}
      <Modal
        title={
          <Space>
            <TeamOutlined />
            <span>为用户&quot;{assigningUser?.username}&quot;分配角色</span>
          </Space>
        }
        open={roleModalVisible}
        onOk={handleAssignRoles}
        onCancel={handleCloseRoleModal}
        okText="确定"
        cancelText="取消"
        confirmLoading={loading}
        width={700}
      >
        {roles.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '40px',
              color: '#999',
            }}
          >
            <Spin />
            <p style={{ marginTop: '16px' }}>加载角色列表中...</p>
          </div>
        ) : (
          <div style={{ marginTop: '20px' }}>
            <Transfer
              dataSource={roles.map((r) => ({
                key: String(r.id),
                title: r.name,
                description: r.description || '',
              }))}
              titles={['可用角色', '已分配角色']}
              targetKeys={selectedRoles.map(String)}
              onChange={(targetKeys) => {
                setSelectedRoles(targetKeys.map(Number));
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
                <Tag color="green">{selectedRoles.length} 个角色</Tag>
              </Space>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
