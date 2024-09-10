'use client'
import React from 'react';
import { Progress } from 'antd';
import { ThunderboltFilled } from '@ant-design/icons';

const ExpSolar: React.FC = () => {
  const currentCapacity = 325; // Fixed value for current capacity
  const maxCapacity = 500; // Fixed value for max capacity
  const percentage = (currentCapacity / maxCapacity) * 100;

  return (
    <div className='flex flex-col'>
        <span className='text-md font-semibold text-black'>Accumulate Solar</span>
        <div className='flex justify-center items-center'>
            <Progress
                type="line"
                percent={percentage}
                percentPosition={{ align: 'center', type: 'inner' }}
                size={[300, 30]}
                format={() => (
                <span className='text-white font-bold'>
                    {currentCapacity}/{maxCapacity} kWh
                </span>
                )}
                strokeColor={{
                '0%': '#10B981', // Tailwind green-500
                '100%': '#3B82F6' // Tailwind blue-500
                }}
            />
            <ThunderboltFilled
                className='size-8'
            />
            </div>
    </div>
    
  );
};

export default ExpSolar;
