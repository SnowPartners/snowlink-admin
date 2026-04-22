import { Grid, Layout, Menu, theme, Button, Avatar, Badge } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { AppstoreOutlined, UserOutlined, MenuOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState, useMemo } from 'react';
import Logo from '@/assets/snowlink_logo.svg';
import ModalPortal from '@/components/common/Portal';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getPendingReviewList } from '@/apis/profileReview';
import { getCertificationRenewalPendingList } from '@/apis/certificationReview';
import { getInstructorList, getOwnerList } from '@/apis/users';

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;

const DefaultLayout = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const screens = useBreakpoint();
	const { token } = theme.useToken();
	const [openKeys, setOpenKeys] = useState<string[]>([]);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { data: ownerList } = useQuery({
		queryKey: [QUERY_KEYS.users.getOwnerList],
		queryFn: getOwnerList,
		staleTime: 5 * 60 * 1000,
		select: (response) => response.data,
	});
	const { data: instructorList } = useQuery({
		queryKey: [QUERY_KEYS.users.getInstructorList],
		queryFn: getInstructorList,
		staleTime: 5 * 60 * 1000,
		select: (response) => response.data,
	});
	const { data: profileReviewPendingList } = useQuery({
		queryKey: [QUERY_KEYS.profileReview.getPendingReviewList],
		queryFn: getPendingReviewList,
		staleTime: 5 * 60 * 1000,
	});
	const { data: certificationRenewalPendingList } = useQuery({
		queryKey: [QUERY_KEYS.certificationReview.getCertificationRenewalPendingList],
		queryFn: getCertificationRenewalPendingList,
		staleTime: 5 * 60 * 1000,
	});

	const selectedKeys = useMemo(() => {
		const path = location.pathname;

		if (path === '/admin' || path === '/admin/') {
			return ['dashboard'];
		} else if (path === '/admin/users') {
			return ['users'];
		} else if (path.includes('/admin/profile-review')) {
			return ['profileReview'];
		} else if (path.includes('/admin/certification-renewal-review')) {
			return ['certificationRenewalReview'];
		} else if (path === '/admin/instructors') {
			return ['instructors'];
		} else if (path === '/admin/owners') {
			return ['owners'];
		} else if (path === '/admin/matchings') {
			return ['matchingManage'];
		}

		return ['dashboard'];
	}, [location.pathname]);

	const ownerCount = ownerList?.length ?? 0;
	const instructorCount = instructorList?.length ?? 0;
	const profileReviewPendingCount = profileReviewPendingList?.data?.length ?? 0;
	const certificationRenewalPendingCount = certificationRenewalPendingList?.data?.length ?? 0;
	const totalUserSectionCount = ownerCount + instructorCount + profileReviewPendingCount + certificationRenewalPendingCount;

	useMemo(() => {
		const path = location.pathname;

		if (
			path === '/admin/owners' ||
			path === '/admin/instructors' ||
			path.includes('/admin/profile-review') ||
			path.includes('/admin/certification-renewal-review')
		) {
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
					height: 52,
					paddingInline: 20,
					display: 'flex',
					gap: 8,
					justifyContent: 'space-between',
					alignItems: 'center',
					backgroundColor: token.colorPrimary,
					color: 'white',
					userSelect: 'none',
					boxShadow: '0 2px 8px rgba(36, 91, 255, 0.25)',
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
				<div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
					<span style={{ color: 'rgba(255,255,255,0.86)', fontSize: 13, fontWeight: 500 }}>스노우링크 관리자 페이지</span>
					<div style={{ width: 1, height: 16, backgroundColor: 'rgba(255,255,255,0.25)' }} />
					<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
						<Avatar size={24} style={{ backgroundColor: 'rgba(255,255,255,0.22)', color: '#fff', fontWeight: 700, fontSize: 11 }}>
							A
						</Avatar>
						<span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 12, fontWeight: 600 }}>관리자</span>
					</div>
				</div>
			</Header>

			<Layout>
				<Sider
					collapsedWidth={0}
					collapsible={false}
					collapsed={false}
					trigger={null}
					width={240}
					style={{
						backgroundColor: '#fff',
						color: token.colorText,
						height: 'auto',
						borderRight: '1px solid #eef1f6',
						// md 이하에서 오버레이로 표시
						...(!screens.md
							? {
									position: 'fixed',
									top: 52,
									left: mobileMenuOpen ? 0 : -240,
									zIndex: mobileMenuOpen ? 1000 : 998,
									height: 'calc(100vh - 52px)',
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
								icon: <AppstoreOutlined />,
								label: '대시보드',
								onClick: () => handleMenuClick('/admin'),
							},
							{
								key: 'userGroup',
								icon: <UserOutlined />,
								label: (
									<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
										<span>사용자</span>
										<Badge count={totalUserSectionCount} overflowCount={999} showZero size='small' color='#ef4444' />
									</div>
								),
								children: [
									{
										key: 'owners',
										label: (
											<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
												<span>업체 관리</span>
												<Badge count={ownerCount} overflowCount={999} showZero size='small' color='#ef4444' />
											</div>
										),
										onClick: () => handleMenuClick('/admin/owners'),
									},
									{
										key: 'instructors',
										label: (
											<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
												<span>강사 관리</span>
												<Badge count={instructorCount} overflowCount={999} showZero size='small' color='#ef4444' />
											</div>
										),
										onClick: () => handleMenuClick('/admin/instructors'),
									},
									{
										key: 'profileReview',
										label: (
											<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
												<span>강사 프로필 심사</span>
												<Badge count={profileReviewPendingCount} overflowCount={999} showZero size='small' color='#ef4444' />
											</div>
										),
										onClick: () => handleMenuClick('/admin/profile-review'),
									},
									{
										key: 'certificationRenewalReview',
										label: (
											<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
												<span>자격증 갱신 심사</span>
												<Badge count={certificationRenewalPendingCount} overflowCount={999} showZero size='small' color='#ef4444' />
											</div>
										),
										onClick: () => handleMenuClick('/admin/certification-renewal-review'),
									},
								],
							},
							{
								key: 'matchingManage',
								icon: <UnorderedListOutlined />,
								label: '매칭 관리',
								onClick: () => handleMenuClick('/admin/matchings'),
							},
						]}
						selectedKeys={selectedKeys}
						openKeys={openKeys}
						onOpenChange={handleOpenChange}
						style={{ backgroundColor: '#fff', color: token.colorText, height: '100%', userSelect: 'none', paddingTop: 8 }}
					/>
				</Sider>
				<Content
					style={{
						padding: !screens.md ? 12 : 24,
						minHeight: 0,
						overflow: 'auto',
						backgroundColor: '#f5f7fb',
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
			<ModalPortal />
		</Layout>
	);
};

export default DefaultLayout;
