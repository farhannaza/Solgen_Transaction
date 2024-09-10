'use client'
import { useState } from 'react';
import { Button, Input, Typography} from 'antd';
import { EditOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Title } = Typography;

const ProfileGrid = () => {
  const [name, setName] = useState('Faridul Farhan');
  const [address, setAddress] = useState('0x1234567890abcdef1234567890abcdef12345678');
  const [userAddress, setUserAddress] = useState('Seri Kembangan');
  const [phone, setPhone] = useState('019-5656 98');
  const [email, setEmail] = useState('farhan.selangor@gmail.com');

  return (
    <div className="flex flex-wrap p-4">
      <div className="w-full md:w-1/3 p-2 flex flex-col items-center gap-4">
        <img
          src="sglogo.svg"
          alt="Profile"
          className="w-32 h-32 rounded-full mb-4"
        />
        <Button icon={<EditOutlined />}>Edit Profile Photo</Button>
      </div>
      <div className="w-full md:w-2/3 p-2">
        <div className="flex justify-between items-center mb-4">
          <Title level={2} editable={{ onChange: setName }}>{name}</Title>
          <Button type="primary">Connect Wallet</Button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Account Address</label>
          <Input value={address} readOnly />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <TextArea value={userAddress} onChange={(e) => setUserAddress(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="flex justify-end">
          <Button type="primary">Update</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileGrid;