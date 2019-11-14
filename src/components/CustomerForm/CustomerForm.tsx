import React from 'react';
import { RouteComponentProps } from 'react-router';
import { WrappedFormInternalProps } from 'antd/lib/form/Form';
import { ICreateCustomer, ICustomer } from '../../services/customer/interface';
import { Button, Form, Icon, Input } from 'antd';
import { AddressSearch } from '../AddressSearch';

type IProps = RouteComponentProps &
	WrappedFormInternalProps & {
		onSubmit: (values: ICreateCustomer) => void;
		edit?: boolean;
		customer?: ICustomer;
	};

export const CustomerForm: React.FC<IProps> = (props) => {
	const { getFieldDecorator } = props.form;

	const onSubmit = React.useCallback(
		(event: React.SyntheticEvent) => {
			event.preventDefault();

			props.form.validateFields((err, values: ICreateCustomer) => {
				if (err) return;
				props.onSubmit(values);
			});
		},
		[props],
	);

	return (
		<Form onSubmit={onSubmit}>
			<Form.Item>
				{getFieldDecorator('name', {
					rules: [
						{ required: true, message: 'Please input your name.' },
					],
				})(<Input prefix={<Icon type="user" />} placeholder="Name" />)}
			</Form.Item>
			<Form.Item>
				{getFieldDecorator('email', {
					rules: [
						{ required: true, message: 'Please input your email.' },
					],
				})(<Input prefix={<Icon type="mail" />} placeholder="Email" />)}
			</Form.Item>
			<Form.Item>
				{getFieldDecorator('address')(
					<AddressSearch
						onChange={(value) => {
							props.form.setFieldsValue({
								address: value,
							});
						}}
					/>,
				)}
			</Form.Item>
			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					className="login-form-button"
				>
					{props.edit ? 'Update' : 'Submit'}
				</Button>
			</Form.Item>
		</Form>
	);
};
