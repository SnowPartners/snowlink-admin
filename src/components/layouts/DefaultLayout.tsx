import { Grid, Layout, Menu, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState, useMemo } from 'react';
import Logo from '@/assets/snowlink_logo.svg';

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;

const DefaultLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();
  const { token } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const selectedKeys = useMemo(() => {
    const path = location.pathname;

    if (path === '/admin' || path === '/admin/') {
      return ['dashboard'];
    } else if (path === '/admin/users') {
      return ['users'];
    } else if (path === '/admin/profile-review') {
      return ['profileReview'];
    }

    return ['dashboard'];
  }, [location.pathname]);

  useMemo(() => {
    const path = location.pathname;

    if (path === '/admin/users' || path === '/admin/profile-review') {
      if (!openKeys.includes('userGroup')) {
        setOpenKeys(['userGroup']);
      }
    }
  }, [location.pathname, openKeys]);

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          paddingInline: 24,
          display: 'flex',
          gap: 8,
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: token.colorPrimary,
          color: 'white',
          userSelect: 'none',
        }}
      >
        <img src={Logo} alt='logo' style={{ fill: 'white', cursor: 'pointer' }} onClick={() => navigate('/admin')} />
        <h1 style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>스노우링크 관리자 페이지</h1>
      </Header>

      <Layout>
        <Sider
          breakpoint='lg'
          collapsedWidth={0}
          collapsible={false}
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={240}
          style={{ backgroundColor: 'white', color: token.colorText, height: 'auto' }}
        >
          <Menu
            mode='inline'
            items={[
              {
                key: 'dashboard',
                icon: <HomeOutlined />,
                label: '대시보드',
                onClick: () => navigate('/admin'),
              },
              {
                key: 'userGroup',
                icon: <UserOutlined />,
                label: '사용자',
                children: [
                  { key: 'users', label: '사용자 관리', onClick: () => navigate('/admin/users') },
                  { key: 'profileReview', label: '프로필 심사', onClick: () => navigate('/admin/profile-review') },
                ],
              },
            ]}
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={handleOpenChange}
            style={{ backgroundColor: 'white', color: token.colorText, height: '100%', userSelect: 'none' }}
          />
        </Sider>
        <Content
          style={{
            padding: screens.xs ? 12 : 24,
            minHeight: 0,
            overflow: 'auto',
            backgroundColor: 'white',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
