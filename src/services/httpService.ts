import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { BASE_URL, STRIPE_API_KEY } from '../constants/constants';

const client = axios.create({
	baseURL: BASE_URL,
	headers: {
		'X-Requested-With': 'XMLHttpRequest',
		'Content-Type': 'application/x-www-form-urlencoded',
		Accept: 'application/json',
		Authorization: `Bearer ${STRIPE_API_KEY}`,
	},
});

const request = <T>(url: string, { data, ...config }: AxiosRequestConfig) =>
	client.request<T>({
		url,
		data: data ? qs.stringify(data) : null,
		...config,
	});

const get = <T>(url: string, config?: AxiosRequestConfig) =>
	request<T>(url, { ...config, method: 'get' });

const post = <T>(url: string, config?: AxiosRequestConfig) =>
	request<T>(url, { ...config, method: 'post' });

const put = <T>(url: string, config?: AxiosRequestConfig) =>
	request<T>(url, { ...config, method: 'put' });

const remove = <T>(url: string, config?: AxiosRequestConfig) =>
	request<T>(url, { ...config, method: 'delete' });

export const httpService = {
	get,
	post,
	put,
	remove,
};
