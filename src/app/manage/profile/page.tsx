'use client';

import { useState } from 'react';
import {
  Typography,
  Card,
  Form,
  Input,
  Button,
  Upload,
  Avatar,
  Row,
  Col,
  message,
} from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';

const { Title } = Typography;

interface ProfileFormValues {
  username: string;
  email: string;
  phone: string;
  realName: string;
  department: string;
  position: string;
}

export default function ProfilePage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // 模拟用户数据
  const initialValues = {
    username: '管理员',
    email: 'admin@example.com',
    phone: '13800138000',
    realName: '张三',
    department: 'IT部门',
    position: '系统管理员',
  };

  const handleSubmit = async (values: ProfileFormValues) => {
    setLoading(true);
    try {
      // 模拟提交
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('提交的表单数据:', values);
      message.success('个人信息更新成功');
    } catch (error) {
      message.error('更新失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const uploadProps: UploadProps = {
    fileList,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('只能上传图片文件');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('图片大小不能超过2MB');
        return false;
      }
      return false; // 阻止自动上传
    },
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList);
    },
  };

  return (
    <div>
      <Title level={2}>个人信息</Title>

      <Row gutter={24}>
        <Col xs={24} lg={16}>
          <Card title="基本信息">
            <Form
              form={form}
              layout="vertical"
              initialValues={initialValues}
              onFinish={handleSubmit}
            >
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: '请输入用户名' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="真实姓名"
                    name="realName"
                    rules={[{ required: true, message: '请输入真实姓名' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[
                      { required: true, message: '请输入邮箱' },
                      { type: 'email', message: '请输入有效的邮箱地址' },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="手机号"
                    name="phone"
                    rules={[{ required: true, message: '请输入手机号' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item label="部门" name="department">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="职位" name="position">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  保存修改
                </Button>
              </Form.Item>
            </Form>
          </Card>

          <Card title="密码修改" style={{ marginTop: 24 }}>
            <Form layout="vertical">
              <Form.Item
                label="当前密码"
                name="currentPassword"
                rules={[{ required: true, message: '请输入当前密码' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="新密码"
                name="newPassword"
                rules={[
                  { required: true, message: '请输入新密码' },
                  { min: 6, message: '密码至少6位' },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="确认新密码"
                name="confirmPassword"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: '请确认新密码' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('两次密码输入不一致'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary">修改密码</Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="头像设置">
            <div style={{ textAlign: 'center' }}>
              <Avatar
                size={120}
                icon={<UserOutlined />}
                style={{ marginBottom: 16 }}
              />
              <div>
                <Upload {...uploadProps} showUploadList={false}>
                  <Button icon={<UploadOutlined />}>上传头像</Button>
                </Upload>
                <div
                  style={{
                    color: '#666',
                    fontSize: '12px',
                    marginTop: '8px',
                  }}
                >
                  支持JPG、PNG格式，文件大小不超过2MB
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
