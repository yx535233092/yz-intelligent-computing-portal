'use client';

import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Table, Spin, Progress, Typography, Divider, Space, Tag } from 'antd';
import { 
  BarChartOutlined, 
  UserOutlined, 
  RocketOutlined, 
  FieldTimeOutlined,
  AppstoreOutlined,
  FireOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/monitoring/visit?type=summary');
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Fetch stats error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const timer = setInterval(fetchStats, 30000);
    return () => clearInterval(timer);
  }, []);

  const topPagesColumns = [
    {
      title: '热门应用路径',
      dataIndex: 'path',
      key: 'path',
      render: (path: string) => <Text copyable={{ text: path }}>{path.replace('/portal/service/service-app/', '')}</Text>
    },
    {
      title: '访问人气',
      dataIndex: '_count',
      key: 'count',
      render: (count: any) => (
        <Space>
          <FireOutlined style={{ color: '#ff4d4f' }} />
          <Text strong>{count.id}</Text>
        </Space>
      )
    },
    {
      title: '平均使用时长',
      dataIndex: '_avg',
      key: 'avg',
      render: (avg: any) => {
        const dur = Math.round(avg.duration || 0);
        let color = '#52c41a';
        if (dur > 60) color = '#1890ff';
        if (dur > 300) color = '#fadb14';
        return <Progress percent={Math.min(dur / 10, 100)} size="small" strokeColor={color} format={() => `${dur}s`} />;
      }
    },
  ];

  if (loading && !stats) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <Spin size="large" tip="正在构建业务驾驶舱..." />
      </div>
    );
  }

  return (
    <div className="p-2 space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <Title level={3}>智算专业服务驾驶舱</Title>
          <Text type="secondary">实时监控全站 AI 服务调用频率与用户交互深度</Text>
        </div>
        <Text type="secondary">最后更新: {new Date().toLocaleTimeString()}</Text>
      </div>
      
      {/* 第一行：核心流量指标 */}
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card hoverable bordered={false} className="shadow-sm bg-gradient-to-br from-red-50 to-white">
            <Statistic
              title="全站访问总量 (PV)"
              value={stats?.totalVisits || 0}
              prefix={<BarChartOutlined />}
              valueStyle={{ color: '#d32d26' }}
            />
            <div className="mt-2 text-xs text-gray-400">较昨日 <Text type={stats?.growthRate >= 0 ? 'success' : 'danger'}>{stats?.growthRate >= 0 ? '↑' : '↓'} {Math.abs(stats?.growthRate || 0)}%</Text></div>
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable bordered={false} className="shadow-sm bg-gradient-to-br from-orange-50 to-white">
            <Statistic
              title="活跃用户数 (UV)"
              value={stats?.activeUserCount || 0}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
            <div className="mt-2 text-xs text-gray-400">全库已累计记录用户 <Text strong>{stats?.activeUserCount || 0}</Text> 名</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable bordered={false} className="shadow-sm bg-gradient-to-br from-purple-50 to-white">
            <Statistic
              title="近期活跃度 (7日)"
              value={stats?.recentLogsCount || 0}
              prefix={<FieldTimeOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
            <div className="mt-2 text-xs text-gray-400">平均每日产生 <Text strong>{Math.round((stats?.recentLogsCount || 0) / 7)}</Text> 条记录</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable bordered={false} className="shadow-sm bg-gradient-to-br from-green-50 to-white">
            <Statistic
              title="服务健康率"
              value={stats?.successRate || 100}
              suffix="%"
              prefix={<RocketOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
            <div className="mt-2 text-xs text-gray-400">基于数据库 <Text strong>{stats?.totalVisits || 0}</Text> 条请求采样</div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* 左侧：业务板块分布 */}
        <Col span={8}>
          <Card title="业务板块活跃分布" bordered={false} className="shadow-sm h-full">
            <div className="space-y-6 py-2">
              {stats?.categoryStats?.map((cat: any) => (
                <div key={cat.name}>
                  <div className="flex justify-between mb-2">
                    <Text strong><AppstoreOutlined className="mr-2" />{cat.name}</Text>
                    <Text type="secondary">{cat.value} 次访问</Text>
                  </div>
                  <Progress 
                    percent={Math.round((cat.value / (stats.totalVisits || 1)) * 100)} 
                    strokeColor={{ '0%': '#d32d26', '100%': '#f87171' }}
                    status="active"
                  />
                </div>
              ))}
            </div>
            <Divider />
            <div className="bg-gray-50 p-4 rounded-lg">
              <Text type="secondary" italic style={{ fontSize: 12 }}>
                * 建议：智能应用板块近期活跃度最高，可优先分配推理算力资源。
              </Text>
            </div>
          </Card>
        </Col>

        {/* 右侧：热门应用明细 */}
        <Col span={16}>
          <Card 
            title={<span><FireOutlined className="mr-2" style={{ color: '#ff4d4f' }} />高价值应用排行榜 (Top 5)</span>} 
            bordered={false} 
            className="shadow-sm h-full"
          >
            <Table 
              dataSource={stats?.topPages || []} 
              columns={topPagesColumns} 
              pagination={false}
              rowKey="path"
              size="middle"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
