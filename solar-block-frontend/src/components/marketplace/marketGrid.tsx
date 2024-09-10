'use client'
import React, { useEffect } from 'react';
import { Card, Col, Row, Button, Avatar, Dropdown, Menu } from 'antd';
import { IconDollarsignCircleFill } from "symbols-react";
import { EllipsisOutlined } from '@ant-design/icons';
import Web3 from 'web3';

const items = [
    { id: 1, name: "User1", wallet: "0x123...abc", priceRM: 40, priceSOL: 0.001, kWh: 50 },
    { id: 2, name: "User2", wallet: "0x456...def", priceRM: 80, priceSOL: 0.002, kWh: 100 },
    { id: 3, name: "User3", wallet: "0x789...ghi", priceRM: 120, priceSOL: 0.005, kWh: 150 },
    { id: 4, name: "User4", wallet: "0xabc...jkl", priceRM: 160, priceSOL: 0.01, kWh: 200 },
    { id: 5, name: "User5", wallet: "0xdef...mno", priceRM: 200, priceSOL: 0.006, kWh: 250 },
    { id: 6, name: "User6", wallet: "0xpqr...stu", priceRM: 240, priceSOL: 0.009, kWh: 300 },
    { id: 7, name: "User7", wallet: "0xvwx...yz1", priceRM: 250, priceSOL: 0.012, kWh: 350 },
    { id: 8, name: "User8", wallet: "0x234...567", priceRM: 100, priceSOL: 0.005, kWh: 400 },
    { id: 9, name: "User9", wallet: "0x890...123", priceRM: 150, priceSOL: 0.015, kWh: 450 },
    { id: 10, name: "User10", wallet: "0x456...789", priceRM: 200, priceSOL: 0.002, kWh: 500 },
    { id: 11, name: "User11", wallet: "0xabc...def", priceRM: 220, priceSOL: 0.001, kWh: 550 },
    { id: 12, name: "User12", wallet: "0xghi...jkl", priceRM: 250, priceSOL: 0.025, kWh: 600 },
];

const menu = (
    <Menu>
        <Menu.Item key="1">Report</Menu.Item>
        <Menu.Item key="2">Contact</Menu.Item>
    </Menu>
);

const recipientAddress = "0xD6807e1550e1ED6676687E6f19D8c25c7da41668"; 

export default function MarketGrid() {
    useEffect(() => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
        } else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    }, []);

    const handleBuy = async (priceSOL: number) => {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const senderAddress = accounts[0];

        const transactionParameters = {
            to: recipientAddress,
            from: senderAddress,
            value: web3.utils.toWei(priceSOL.toString(), 'ether'),
        };

        try {
            await web3.eth.sendTransaction(transactionParameters);
            alert('Transaction successful!');
        } catch (error) {
            console.error('Transaction failed', error);
            alert('Transaction failed');
        }
    };

    return (
        <main>
            <div className="pb-4 justify-between flex">
                <div>
                    <p className="font-semibold text-lg">Solar Energy</p>
                    <p className='text-sm text-gray-500 font-normal'>Buy and sell directly with your peers.</p>
                </div>
                <Button type="primary" className='text-white'>Sell <IconDollarsignCircleFill className='fill-white' /></Button>
            </div>
            <Row gutter={16}>
                {items.map(item => (
                    <Col span={6} key={item.id} className='mb-4'>
                        <Card className='hover:scale-up'>
                            <div className='flex flex-col mb-2 gap-2'>
                                <div className='flex gap-4 justify-between'>
                                    <div className='flex gap-2 items-center'>
                                        <Avatar>U</Avatar>
                                        <div className='flex flex-col'>
                                            <span className='font-bold text-md'>
                                                {item.name}
                                            </span>
                                            <span className='text-sm text-gray-500'>
                                                {item.wallet}
                                            </span>
                                        </div>
                                    </div>
                                    <Dropdown overlay={menu} trigger={['click']}>
                                        <EllipsisOutlined className="text-2xl cursor-pointer hover:text-gray-300" />
                                    </Dropdown>
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <img src="solarenergy.svg" alt="Solar Energy" className='w-1/2 h-1/2 p-2' />
                            </div>
                            <div className='text-center text-sm font-semibold text-gray-500'>
                                {item.kWh} kWh
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='text-sm font-semibold text-gray-500'>Normal Currency</div>
                                <div className='text-sm font-semibold text-gray-500'>Cryptocurrency</div>
                            </div>
                            <div className='flex justify-between items-center pb-2'>
                                <div className='text-lg font-bold'>RM {item.priceRM}</div>
                                <div className='text-lg font-bold'>{item.priceSOL} SOL</div>
                            </div>
                            <div className='flex justify-center'>
                                <Button type="primary" className='w-2/6' onClick={() => handleBuy(item.priceSOL)}>Buy</Button>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </main>
    );
}
