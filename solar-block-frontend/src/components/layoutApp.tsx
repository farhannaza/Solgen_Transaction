'use client';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Card, Button } from 'antd';
import { BuildOutlined, ThunderboltOutlined, UserOutlined, MailOutlined, SettingOutlined, UserAddOutlined, SwapOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

type MenuItem = Required<MenuProps>['items'][number];
const { Sider, Content } = Layout;

const items: MenuItem[] = [
  { key: '/dashboard', label: <Link className='text-md' href='/dashboard'>Dashboard</Link>, icon: <BuildOutlined /> },
  { key: '/marketplace', label: <Link className='text-md' href='/marketplace'>Marketplace</Link>, icon: <ThunderboltOutlined /> },
  { key: '/exchange', label: <Link className='text-md' href='/exchange'>Exchange Currency</Link>, icon: <SwapOutlined /> },
  { key: '/', label: <Link className='text-md' href='/'>Profile</Link>, icon: <UserOutlined /> },
];

interface PageName {
  key: string;
  label: string;
}

const pages: PageName[] = [
  { key: '/dashboard', label: 'Dashboard' },
  { key: '/marketplace', label: 'Marketplace' },
  { key: '/exchange', label: 'Exchange Currency' },
  { key: '/', label: 'Profile' },
];

export default function LayoutApp({ children }: Readonly<{ children: React.ReactNode; }>) {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const pathname = usePathname();
  const [current, setCurrent] = useState('');

  const getPageTitle = (key: string): string => {
    const page = pages.find(p => p.key === key);
    return page ? page.label : 'Unknown Page';
  };

  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Call handler right away so state gets updated with initial window size
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onClick: MenuProps['onClick'] = (e: { key: string }) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Layout hasSider>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          background: '#F8F8FF'
        }}
      >
        <div className='flex mt-6 justify-center items-center'>
          <img src='sglogo.svg' alt="Logo" className='w-12 h-12' />
          {!collapsed && <span className='ml-2 font-black text-3xl
          bg-gradient-to-r from-blue-600 to-green-500
          inline-block text-transparent bg-clip-text
          '>SolGen</span>}
        </div>
        <Menu
          onClick={onClick}
          selectedKeys={[pathname]} // Always reflect the current path
          mode="inline"
          theme="dark"
          items={items}
          className="custom-menu" // Add custom class
          style={{ padding: '16px 0', background: '#F8F8FF', height: 'fill' }}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200, background: '#F8F8FF', height: 'full' }}>
        <Content
          className='flex flex-col h-screen rounded-md p-4'
        >
          <Card
            title={<span className='text-xl'>{getPageTitle(pathname)}</span>}
            extra={
              <>
                <Button type="link" icon={<MailOutlined />} />
                <Button type="link" icon={<SettingOutlined />} />
                <Button type="primary" icon={<UserAddOutlined />}>
                  Invite
                </Button>
              </>
            }
            style={{ borderRadius: borderRadiusLG }}
          >
            {children}
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}
