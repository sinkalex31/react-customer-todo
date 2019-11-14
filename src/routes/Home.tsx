import React from 'react';
import { List } from 'antd';
import { useCustomerContext } from '../contexts/Customer';
import { CustomerListItem } from '../components/CustomerListItem';

export const Home: React.FC = () => {
	const context = useCustomerContext();

	return (
		<List
			dataSource={context.list}
			renderItem={(item) => <CustomerListItem item={item} />}
		/>
	);
};
