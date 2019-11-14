import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import { CustomerProvider } from './contexts/Customer';
import { Home } from './routes/Home';
import { CreateCustomer } from './routes/CreateCustomer';
import { Customer } from './routes/Customer';
import { NotFound } from './routes/NotFound';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';

export const Root: React.FC = () => (
	<BrowserRouter>
		<Layout>
			<Navigation />
			<CustomerProvider>
				<Layout.Content className="content">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/create" component={CreateCustomer} />
						<Route path="/customer/:id" component={Customer} />
						<Route path="*" component={NotFound} />
					</Switch>
				</Layout.Content>
			</CustomerProvider>
			<Layout.Footer>
				<Footer />
			</Layout.Footer>
		</Layout>
	</BrowserRouter>
);
