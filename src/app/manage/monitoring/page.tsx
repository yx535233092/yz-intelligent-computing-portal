'use client';

import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Typography, Space, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function MonitoringPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const fetchLogs = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/monitoring/visit?type=detail&page=${page}&pageSize=${pageSize}`);
      const result = await res.json();
      setData(result.data);
      setTotal(result.total);
      setPagination({ current: page, pageSize });
    } catch (error) {
      console.error('获取日志失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const columns = [
    {
      title: '访问时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: 120,
      render: (text: string) => <Tag color="blue">{text || '游客'}</Tag>,
    },
    {
      title: '访问路径',
      dataIndex: 'path',
      key: 'path',
      ellipsis: true,
    },
    {
      title: '停留时长',
      dataIndex: 'duration',
      key: 'duration',
      width: 120,
      render: (seconds: number) => {
        let color = 'green';
        if (seconds > 60) color = 'orange';
        if (seconds > 300) color = 'red';
        return <Tag color={color}>{seconds} 秒</Tag>;
      },
      sorter: true,
    },
    {
      title: 'IP 地址',
      dataIndex: 'ip',
      key: 'ip',
      width: 140,
    },
    {
      title: '浏览器/环境',
      dataIndex: 'userAgent',
      key: 'userAgent',
      width: 100,
      render: (ua: string) => (
        <Tooltip title={ua}>
          <InfoCircleOutlined className="cursor-help" />
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <Title level={4}>系统访问日志明细</Title>
      <Card bordered={false} className="shadow-sm">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          pagination={{
            ...pagination,
            total,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
          onChange={(p) => fetchLogs(p.current, p.pageSize)}
        />
      </Card>
    </div>
  );
}
