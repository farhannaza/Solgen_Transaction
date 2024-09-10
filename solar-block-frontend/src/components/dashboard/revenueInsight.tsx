'use client'
import React from 'react';
import { LineChart } from '@mui/x-charts';

const RevenueInsight = () => {
  // Sample data for monthly revenue projection in RM
  const months = [
    'Jan 2023', 'Feb 2023', 'Mar 2023', 'Apr 2023', 'May 2023', 'Jun 2023',
    'Jul 2023', 'Aug 2023', 'Sep 2023', 'Oct 2023', 'Nov 2023', 'Dec 2023'
  ];
  const revenueData = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]; // Revenue in RM

  return (
    <LineChart
      xAxis={[{ scaleType: 'band', data: months }]}
      series={[
        {
          data: revenueData,
          label: 'Revenue (RM)',
        },
      ]}
      width={800}
      height={300}
      margin={{ left: 35, right: 50, top: 30, bottom: 30 }}
    />
  );
};

export default RevenueInsight;
