import { Grid, Layout, Menu, theme, Button } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { HomeOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
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
	const [openKeys, setOpenKeys] = useState<string[]>([]);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

	const handleMenuClick = (path: string) => {
		navigate(path);
		// md 이하에서 메뉴 클릭 시 자동으로 닫기
		if (!screens.md) {
			setMobileMenuOpen(false);
		}
	};

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen);
	};

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Header
				style={{
					paddingInline: 20,
					display: 'flex',
					gap: 8,
					justifyContent: 'space-between',
					alignItems: 'center',
					backgroundColor: token.colorPrimary,
					color: 'white',
					userSelect: 'none',
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
					{!screens.md && (
						<Button
							type='text'
							icon={<MenuOutlined />}
							onClick={toggleMobileMenu}
							style={{ color: 'white', border: 'none' }}
						/>
					)}
					<img src={Logo} alt='logo' style={{ fill: 'white', cursor: 'pointer' }} onClick={() => navigate('/admin')} />
				</div>
				<h1 style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>스노우링크 관리자 페이지</h1>
			</Header>

			<Layout>
				<Sider
					collapsedWidth={0}
					collapsible={false}
					collapsed={false}
					trigger={null}
					width={240}
					style={{
						backgroundColor: 'white',
						color: token.colorText,
						height: 'auto',
						// md 이하에서 오버레이로 표시
						...(!screens.md
							? {
									position: 'fixed',
									top: 64,
									left: mobileMenuOpen ? 0 : -240,
									zIndex: mobileMenuOpen ? 1000 : 998,
									height: 'calc(100vh - 64px)',
									transition: 'left 0.3s ease, z-index 0.3s ease',
									overflow: 'hidden',
									visibility: mobileMenuOpen ? 'visible' : 'hidden',
							  }
							: {}),
					}}
				>
					<Menu
						mode='inline'
						items={[
							{
								key: 'dashboard',
								icon: <HomeOutlined />,
								label: '대시보드',
								onClick: () => handleMenuClick('/admin'),
							},
							{
								key: 'userGroup',
								icon: <UserOutlined />,
								label: '사용자',
								children: [
									{ key: 'users', label: '사용자 관리', onClick: () => handleMenuClick('/admin/users') },
									{
										key: 'profileReview',
										label: '프로필 심사',
										onClick: () => handleMenuClick('/admin/profile-review'),
									},
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
						padding: !screens.md ? 12 : 24,
						minHeight: 0,
						overflow: 'auto',
						backgroundColor: 'white',
						// md 이하에서 메뉴가 열려있을 때 오버레이 추가
						...(!screens.md
							? {
									position: 'relative',
									zIndex: 1,
							  }
							: {}),
					}}
				>
					{/* md 이하에서 메뉴가 열려있을 때 배경 오버레이 */}
					{!screens.md && mobileMenuOpen && (
						<div
							style={{
								position: 'fixed',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								backgroundColor: 'rgba(0, 0, 0, 0.5)',
								zIndex: 999,
								transition: 'opacity 0.3s ease',
							}}
							onClick={() => setMobileMenuOpen(false)}
						/>
					)}
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};

export default DefaultLayout;
