import React from 'react';
import { Link } from 'react-router-dom';
import { List, Avatar, Icon } from 'antd';
import { useCustomerContext } from '../../contexts/Customer';
import { ICustomer } from '../../services/customer/interface';

interface IProps {
	item: ICustomer;
}

export const CustomerListItem: React.FC<IProps> = (props) => {
	const context = useCustomerContext();

	return (
		<List.Item
			actions={[
				<Link to={`/customer/${props.item.id}`}>
					<Icon type="edit" theme="filled" />
				</Link>,
				<Icon
					type="close-circle"
					theme="filled"
					onClick={() => {
						context.remove(props.item.id);
					}}
				/>,
			]}
		>
			<List.Item.Meta
				avatar={
					<Avatar src="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png" />
				}
				title={props.item.name}
				description={props.item.metadata.city}
			/>
			<div>{props.item.email}</div>
		</List.Item>
	);
};
