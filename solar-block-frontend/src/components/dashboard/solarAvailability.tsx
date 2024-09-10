'use client'
import React, { useState } from 'react';
import { Progress, Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

const SolarAvailability: React.FC = () => {
  const [solarAvailability, setSolarAvailability] = useState(50); // Initial value set to 50%

  const increaseAvailability = () => {
    setSolarAvailability(prev => Math.min(prev + 10, 100)); // Increase by 10%, max 100%
  };

  const decreaseAvailability = () => {
    setSolarAvailability(prev => Math.max(prev - 10, 0)); // Decrease by 10%, min 0%
  };

  const sellSolarEnergy = () => {
    alert(`Selling ${solarAvailability}% of solar energy`);
    setSolarAvailability(0); // Reset to 0 after selling
  };

  const kWh = (solarAvailability / 100) * 500; // Calculate kWh based on percentage

  return (
    <div style={{ textAlign: 'center' }}>
      <div className='flex font-bold text-5xl justify-center items-center p-4'>
        {kWh} kWh 
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button onClick={decreaseAvailability} icon={<MinusOutlined />} />
        <Progress percent={solarAvailability} style={{ width: '60%', margin: '0 10px' }} />
        <Button onClick={increaseAvailability} icon={<PlusOutlined />} />
      </div>
      <div className='mt-5'>
        <Button type="primary" onClick={sellSolarEnergy}>Sell Your Solar</Button>
      </div>
    </div>
  );
};

export default SolarAvailability;
