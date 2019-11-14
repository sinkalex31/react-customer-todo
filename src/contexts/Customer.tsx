import React from 'react';
import constate from 'constate';
import { ICreateCustomer, ICustomer } from '../services/customer/interface';
import { customerService } from '../services/customer';

function useCustomers() {
	const [list, setList] = React.useState<ICustomer[]>([]);

	React.useEffect(() => {
		customerService
			.fetchList()
			.then((response) => {
				setList(response.data.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const create = React.useCallback(
		(values: ICreateCustomer, callback: CallableFunction) => {
			customerService
				.create(values)
				.then((response) => {
					setList([response.data, ...list]);
					callback();
				})
				.catch((error) => {
					console.log(error);
				});
		},
		[list],
	);

	const update = React.useCallback(
		(id: string, values: ICreateCustomer, callback: CallableFunction) => {
			customerService
				.update(id, values)
				.then(() => {
					setList(
						list.map((customer) => {
							let newCustomer = { ...customer };

							if (newCustomer.id === id) {
								newCustomer = Object.assign(
									newCustomer,
									values,
								);
							}

							return newCustomer;
						}),
					);
					callback();
				})
				.catch((error) => {
					console.log(error);
				});
		},
		[list],
	);

	const remove = React.useCallback(
		(id: string) => {
			customerService
				.remove(id)
				.then((response) => {
					setList(
						list.filter((item) => item.id !== response.data.id),
					);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		[list],
	);

	return { list, create, update, remove };
}

const [CustomerProvider, useCustomerContext] = constate(useCustomers);

export { CustomerProvider, useCustomerContext };
