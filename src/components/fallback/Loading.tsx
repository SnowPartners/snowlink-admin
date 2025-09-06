import { Layout, Spin } from 'antd';
import { Content } from 'antd/es/layout/layout';

const Loading = () => {
	return (
		<Layout style={{ height: '100%', backgroundColor: 'white' }}>
			<Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
				<Spin size='large' />
			</Content>
		</Layout>
	);
};

export default Loading;
