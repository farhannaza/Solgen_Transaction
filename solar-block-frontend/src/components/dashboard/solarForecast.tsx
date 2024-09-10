'use client'
import React from 'react';
import { Table, Typography } from 'antd';

const { Text } = Typography;

const SolarForecastDaily: React.FC = () => {
  // Sample data for 5 days
  const forecastData = [
    { key: '1', day: 'Day 1', energy: 50 }, // in kWh
    { key: '2', day: 'Day 2', energy: 82 },
    { key: '3', day: 'Day 3', energy: 74 },
    { key: '4', day: 'Day 4', energy: 102 },
    { key: '5', day: 'Day 5', energy: 39 },
  ];

  const columns = [
    {
      title: 'Day',
      dataIndex: 'day',
      key: 'day',
      align: 'center' as 'center', // Explicitly cast to the expected type
      render: (text: string) => <Text style={{ fontSize: '16px' }}>{text}</Text>,
    },
    {
      title: 'Energy (kWh)',
      dataIndex: 'energy',
      key: 'energy',
      align: 'center' as 'center', // Explicitly cast to the expected type
      render: (text: number) => <Text style={{ fontSize: '16px' }}>{`${text} kWh`}</Text>,
    },
  ];

  return (
    <div>
      <Table dataSource={forecastData} columns={columns} pagination={false} />
    </div>
  );
};

export default SolarForecastDaily;
