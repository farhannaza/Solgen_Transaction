'use client';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Card, Button, Modal, Typography } from 'antd';
import { 
  BuildOutlined, 
  ThunderboltOutlined, 
  UserOutlined, 
  MailOutlined, 
  SettingOutlined, 
  UserAddOutlined, 
  SwapOutlined, 
  QuestionCircleOutlined 
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

type MenuItem = Required<MenuProps>['items'][number];
const { Sider, Content } = Layout;
const { Title, Paragraph, Text } = Typography;

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
  const [showHelp, setShowHelp] = useState(false);

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
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onClick: MenuProps['onClick'] = (e: { key: string }) => {
    setCurrent(e.key);
  };

  const HelpContent = () => (
    <div className="space-y-4">
      <Title level={4} className="!mb-6">Frequently Asked Questions</Title>
      
      <div className="faq-section">
        <Text strong>Q: How do I view my energy savings?</Text>
        <Paragraph>A: Visit the Dashboard page to see your current energy savings and solar production metrics.</Paragraph>
      </div>

      <div className="faq-section">
        <Text strong>Q: How does currency exchange work?</Text>
        <Paragraph>A: Use the Exchange Currency page to convert between different currencies using real-time rates.</Paragraph>
      </div>

      <div className="faq-section">
        <Text strong>Q: When will I receive my solar credits?</Text>
        <Paragraph>A: Credits are distributed monthly on the 1st, based on the previous month's production.</Paragraph>
      </div>

      <div className="contact-section mt-8">
        <Title level={5}>Need more assistance?</Title>
        <Paragraph className="mt-2">
          Contact our support team:
          <div className="mt-2">
            <Text strong className="text-blue-600 block">
              ☎️ +1 (800) 123-4567
            </Text>
            <Text className="my-1">or</Text>
            <Text strong className="text-blue-600">
              ✉️ support@solgen.com
            </Text>
          </div>
        </Paragraph>
      </div>
    </div>
  );

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
          {!collapsed && (
            <span className='ml-2 font-black text-3xl
              bg-gradient-to-r from-blue-600 to-green-500
              inline-block text-transparent bg-clip-text'>
              SolGen
            </span>
          )}
        </div>
        <Menu
          onClick={onClick}
          selectedKeys={[pathname]}
          mode="inline"
          theme="dark"
          items={items}
          className="custom-menu"
          style={{ padding: '16px 0', background: '#F8F8FF', height: 'fill' }}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200, background: '#F8F8FF', height: 'full' }}>
        <Content className='flex flex-col h-screen rounded-md p-4'>
          <Card
            title={<span className='text-xl'>{getPageTitle(pathname)}</span>}
            extra={
              <>
                <Button type="link" icon={<MailOutlined />} />
                <Button type="link" icon={<SettingOutlined />} />
                <Button 
                  type="link" 
                  icon={<QuestionCircleOutlined />} 
                  onClick={() => setShowHelp(true)}
                  aria-label="Help"
                />
                <Button type="primary" icon={<UserAddOutlined />}>
                  Invite
                </Button>
              </>
            }
            style={{ borderRadius: borderRadiusLG }}
          >
            {children}
          </Card>

          <Modal
            title="Help & Support"
            open={showHelp}
            onCancel={() => setShowHelp(false)}
            footer={null}
            centered
            styles={{
              content: {
                borderRadius: borderRadiusLG,
                backgroundColor: colorBgContainer,
                padding: '24px',
              },
              header: {
                borderBottom: '1px solid #f0f0f0',
              }
            }}
          >
            <HelpContent />
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
}