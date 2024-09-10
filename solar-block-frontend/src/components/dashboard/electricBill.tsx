import React from 'react';
import { Alert } from 'antd';

const electricBill = 120; // Example electric bill amount
const billAfterSolar = 45;

const ElectricBill: React.FC= () => {
  return (
    <div>
    <Alert
      message={`Current Electric Bill: RM${electricBill}.00`}
      type="warning"
      style={{ marginBottom: '10px', fontWeight:'bold', fontSize:'16px' }} 
    />
    <Alert
      message={`After Solar Savings: RM${billAfterSolar}.00`}
      type="success"
      style={{ fontWeight:'bold', fontSize:'16px' }} 
    />
  </div>
  );
};

export default ElectricBill;
