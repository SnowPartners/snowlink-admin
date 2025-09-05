import { Button, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Text from 'antd/es/typography/Text';

const ErrorWithRetry = () => {
  return (
    <Layout style={{ height: '100%', backgroundColor: 'white' }}>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Content
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 16 }}
        >
          <Text>데이터를 불러오는 데 실패했어요</Text>
          <Button type='primary' onClick={() => window.location.reload()}>
            다시 시도
          </Button>
        </Content>
      </Content>
    </Layout>
  );
};

export default ErrorWithRetry;
