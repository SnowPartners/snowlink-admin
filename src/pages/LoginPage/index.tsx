import { Button, Grid, Input, Layout, message } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { postLogin } from '@/apis/auth';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useAuthStore } from '@/stores/useAuthStore';

const LoginPage = () => {
	const navigate = useNavigate();
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

	const [password, setPassword] = useState('');
	const loginMutation = useMutation({
		mutationFn: postLogin,
		mutationKey: [QUERY_KEYS.auth.postLogin],
		onSuccess: (data) => {
			useAuthStore.getState().setAccessToken(data.data.accessToken);
			useAuthStore.getState().setUserInfo(data.data.userInfo);
			navigate('/admin', { replace: true });
		},
		onError: () => {
			message.error('비밀번호가 일치하지 않아요');
		},
	});

	const handleLogin = () => {
		loginMutation.mutate({ password });
	};

	return (
		<Layout
			style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
		>
			<Content
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					gap: 16,
					width: screens.md ? 380 : 300,
				}}
			>
				<Title level={2}>관리자 로그인</Title>
				<Input.Password
					id='password'
					placeholder='비밀번호'
					size='large'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					onPressEnter={handleLogin}
				/>
				<Button type='primary' size='large' style={{ width: '100%' }} onClick={handleLogin} disabled={!password}>
					로그인
				</Button>
			</Content>
		</Layout>
	);
};

export default LoginPage;
