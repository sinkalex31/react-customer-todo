import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

export const Navigation: React.FC = () => {
	const [selected, setSelected] = React.useState<string>(
		window.location.pathname,
	);

	const onClick = React.useCallback((event) => {
		setSelected(event.key);
	}, []);

	return (
		<Menu mode="horizontal" onClick={onClick} selectedKeys={[selected]}>
			<Menu.Item key="/">
				<Link to="/">
					<Icon type="user-add" />
					Home
				</Link>
			</Menu.Item>
			<Menu.Item key="/create">
				<Link to="/create">
					<Icon type="user-add" />
					Add customer
				</Link>
			</Menu.Item>
		</Menu>
	);
};
