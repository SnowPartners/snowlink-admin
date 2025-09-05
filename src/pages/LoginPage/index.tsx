import { Button, Grid, Input, Layout, message } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const [password, setPassword] = useState('');

  // TODO: 로그인 로직 추가
  const handleLogin = () => {
    if (password === '1234') {
      message.success('로그인 성공');
      navigate('/admin', { replace: true });
    } else {
      message.error('비밀번호가 일치하지 않습니다.');
    }
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
