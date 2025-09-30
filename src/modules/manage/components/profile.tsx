'use client';

import {
  Typography,
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  message,
  notification,
} from 'antd';
import profileService from '../services/profile';
import { authService } from '@/services/login';

const { Title } = Typography;

export default function Profile() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [api, notificationContextHolder] = notification.useNotification();

  // 修改密码
  const handleEditPassword = async (values: {
    old_password: string;
    new_password: string;
    confirm_password: string;
  }) => {
    try {
      const message = await profileService.editPassword({
        old_password: values.old_password,
        new_password: values.new_password,
      });
      messageApi.success(message);
      // 修改密码成功后，500ms后退出登录
      setTimeout(() => {
        authService.logout();
      }, 500);
    } catch (error: unknown) {
      const errorMessage =
        (error as { detail?: string; message?: string })?.detail ||
        (error as { detail?: string; message?: string })?.message ||
        '修改密码失败，请重试';
      messageApi.error(errorMessage);
    }
  };

  // 重置密码
  const handleResetPassword = async () => {
    try {
      const message = await profileService.resetPassword();
      api.info({
        message: `${message}`,
        placement: 'topRight',
      });
      // 重置密码成功后，500ms后退出登录
      setTimeout(() => {
        authService.logout();
      }, 500);
    } catch (error: unknown) {
      const errorMessage =
        (error as { detail?: string; message?: string })?.detail ||
        (error as { detail?: string; message?: string })?.message ||
        '重置密码失败，请重试';
      messageApi.error(errorMessage);
    }
  };

  return (
    <div>
      {contextHolder}
      {notificationContextHolder}
      <Title level={2}>个人中心</Title>

      <Row gutter={24}>
        <Col span={24}>
          <Card title="密码修改">
            <Form layout="vertical" form={form} onFinish={handleEditPassword}>
              <Form.Item
                label="当前密码"
                name="old_password"
                rules={[{ required: true, message: '请输入当前密码' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="新密码"
                name="new_password"
                rules={[
                  { required: true, message: '请输入新密码' },
                  { min: 6, message: '密码至少6位' },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="确认新密码"
                name="confirm_password"
                dependencies={['new_password']}
                rules={[
                  { required: true, message: '请确认新密码' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('new_password') === value) {
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
                <Button
                  type="primary"
                  htmlType="submit"
                  className="mt-6 mr-6"
                  style={{
                    backgroundColor: '#3875f7 !important',
                    borderColor: '#3875f7 !important',
                  }}
                >
                  修改密码
                </Button>
                <Button
                  htmlType="button"
                  className="mt-6"
                  onClick={handleResetPassword}
                >
                  重置密码
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
