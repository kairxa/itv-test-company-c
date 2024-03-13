import { memo } from 'react';
import ClientsDataProvider from './ClientsDataProvider';
import ClientsApp from './ClientsApp';

function Clients() {
	return (
		<ClientsDataProvider>
			<ClientsApp />
		</ClientsDataProvider>
	);
}

export default memo(Clients);
