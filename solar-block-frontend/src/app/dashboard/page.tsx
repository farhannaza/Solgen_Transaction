import { Metadata } from "next";
import React from 'react';
import ExpSolar from "@/components/dashboard/expSolar";
import ElectricSaved from "@/components/dashboard/electricSaved";
import SolarAvailability from "@/components/dashboard/solarAvailability";
import ElectricBill from "@/components/dashboard/electricBill";
import SolarForecastDaily from "@/components/dashboard/solarForecast";
import RevenueInsight from "@/components/dashboard/revenueInsight";
import { Card, Col, Row } from 'antd';

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Page() {
  return (
    <main className="flex flex-col">
      <div className="flex justify-between">
        <div className="flex flex-col">
        <span className="text-lg font-semibold">Welcome back Faridul!</span>
        <span  className="text-sm text-gray-500 font-normal mb-4">Here is your overview.</span>
        </div>
        <ExpSolar />
      </div>
      
      
      <Row gutter={20} style={{ display: 'flex' }}>
        <Col span={16} style={{ display: 'flex', flexDirection: 'column' }}>
          <Row gutter={20} style={{ display: 'flex', flex: 1 }}>
            <Col span={12} style={{ display: 'flex', flexDirection: 'column' }}>
              <Card style={{ flex: 1 }} className='hover:scale-up'>
              <div className="text-xl flex-col font-semibold flex items-start">
                     Energy Saved
                    <div className="flex w-full mt-4 justify-center">
                  <ElectricSaved />
                </div>
            </div>
              </Card>
            </Col>
            <Col span={12} style={{ display: 'flex', flexDirection: 'column' }}>
              <Card style={{ flex: 1 }} className='hover:scale-up'>
                <div className="text-xl font-semibold mb-2 flex items-center">
                Sellable Energy Input
                </div>
                <SolarAvailability />
              </Card>
            </Col>
          </Row>
          <Card style={{ flex: '1 1 auto', marginTop: '16px' }} className='hover:scale-up'>
            <div className="text-xl font-semibold mb-2 flex items-center">
              Revenue Insight
            </div>
            <RevenueInsight />
          </Card>
        </Col>
        <Col span={8} style={{ display: 'flex', flexDirection: 'column' }} >
          <Card style={{ flex: '1 1 auto', marginBottom: '16px' }} className='hover:scale-up'>
            <div className="text-xl font-semibold mb-4 flex items-center">
              Electric Bill
            </div>
            <div className="flex flex-col w-full">
              <ElectricBill />
            </div>
          </Card>
          <Card style={{ flex: '1 1 auto' }} className='hover:scale-up'>
            <div className="flex flex-col text-xl font-semibold mb-2 justify-around ">
              Solar Forecast (Daily)
            </div>
            <SolarForecastDaily />
          </Card>
        </Col>
      </Row>
    </main>
  );
}
