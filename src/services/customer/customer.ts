import { httpService } from '../httpService';
import {
	ICustomersResponse,
	ICustomer,
	ICustomerRemoveResponse,
	ICreateCustomer,
} from './interface';

const api = '/customers';

const fetchList = () => httpService.get<ICustomersResponse>(api);

const fetchInfo = (id: string) => httpService.get<ICustomer>(`${api}/${id}`);

const update = (id: string, data: ICreateCustomer) =>
	httpService.post<ICustomer>(`${api}/${id}`, { data });

const remove = (id: string) =>
	httpService.remove<ICustomerRemoveResponse>(`${api}/${id}`);

const create = (data: ICreateCustomer) =>
	httpService.post<ICustomer>(api, {
		data,
	});

export const customerService = {
	fetchList,
	fetchInfo,
	update,
	remove,
	create,
};
