import React from 'react';
import { customerService } from '../services/customer';
import { ICustomer } from '../services/customer/interface';

export const useCustomer = (id: string) => {
	const [customer, setCustomer] = React.useState<ICustomer>();

	React.useEffect(() => {
		customerService
			.fetchInfo(id)
			.then((response) => {
				setCustomer(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [id]);

	return customer;
};
