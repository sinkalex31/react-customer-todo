import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { CustomerForm } from '../components/CustomerForm';
import { useCustomer } from '../hooks/useCustomer';
import { ICreateCustomer, ICustomer } from '../services/customer/interface';
import { useCustomerContext } from '../contexts/Customer';

interface IRouteParams {
	id: string;
}

interface IFormProps {
	edit: boolean;
	customer: ICustomer;
	onSubmit: (values: ICreateCustomer) => void;
}

const EditCustomerForm = Form.create<FormComponentProps & IFormProps>({
	name: 'edit_customer_form',
	mapPropsToFields: (props) => ({
		name: Form.createFormField({
			value: props.customer.name,
		}),
		email: Form.createFormField({
			value: props.customer.email,
		}),
		address: Form.createFormField({
			value: props.customer.address,
		}),
	}),
})(CustomerForm);

export const Customer: React.FC<RouteComponentProps<IRouteParams>> = (
	props,
) => {
	const context = useCustomerContext();
	const customer = useCustomer(props.match.params.id);
	const onSubmit = React.useCallback(
		(values) => {
			context.update(props.match.params.id, values, () => {
				props.history.replace('/');
			});
		},
		[props, context],
	);

	if (!customer) {
		return <div>Loading spinner</div>;
	}

	return (
		<EditCustomerForm
			{...props}
			edit
			customer={customer}
			onSubmit={onSubmit}
		/>
	);
};
