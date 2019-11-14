import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { CustomerForm } from '../components/CustomerForm';
import { useCustomerContext } from '../contexts/Customer';
import { ICreateCustomer } from '../services/customer/interface';

interface IFormProps {
	onSubmit: (values: ICreateCustomer) => void;
}

const CreateCustomerForm = Form.create<FormComponentProps & IFormProps>({
	name: 'customer_form',
})(CustomerForm);

export const CreateCustomer: React.FC<RouteComponentProps> = (props) => {
	const context = useCustomerContext();

	const onSubmit = React.useCallback(
		(values: ICreateCustomer) => {
			context.create(values, () => {
				props.history.replace('/');
			});
		},
		[props, context],
	);

	return <CreateCustomerForm {...props} onSubmit={onSubmit} />;
};
