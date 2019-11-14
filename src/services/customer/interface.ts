export interface ICustomer {
	id: string;
	object: string;
	balance: number;
	created: number;
	currency: string;
	delinquent: boolean;
	invoice_prefix: string;
	livemode: boolean;
	metadata: Record<string, any>;
	name: string;
	tax_exempt: string;
	address?: Record<string, any>;
	default_source?: string;
	description?: string;
	discount?: Record<string, any>;
	email?: string;
	phone?: number;
	preferred_locales?: string[];
}

export interface ICustomersResponse {
	data: ICustomer[];
	has_more: boolean;
	object: string;
	url: string;
}

export interface ICustomerRemoveResponse {
	id: string;
	object: string;
	deleted: boolean;
}

export interface ICreateCustomer {
	name: string;
	email: string;
	address?: string;
}
