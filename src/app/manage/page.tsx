'use client';

import { Typography, Card, Row, Col } from 'antd';

const { Title } = Typography;

export default function ManagePage() {
  return (
    <div>
      <Title level={2}>仪表盘</Title>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <h3>欢迎来到管理后台</h3>
            <p>这里是后台管理系统的主页面。</p>
            <p>您可以通过左侧菜单导航到不同的功能页面。</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
