import { Request, Response } from 'express';

export const store: IStore = {
	entities: {
		'xx-aa-bb': {
			id: 'xx-aa-bb',
			firstName: 'John',
			lastName: 'Smitherin',
			email: 'john@gmail.com',
			phoneNumber: '+6192099102',
		},
		'yy-bb-cc': {
			id: 'yy-bb-cc',
			firstName: 'Jane',
			lastName: 'Doe',
			email: 'jane@gmail.com',
			phoneNumber: '+6192099103',
		},
		'zz-cc-dd': {
			id: 'zz-cc-dd',
			firstName: 'Bob',
			lastName: 'Smith',
			email: 'bob@gmail.com',
			phoneNumber: '+6192099104',
		},
		'aa-dd-ee': {
			id: 'aa-dd-ee',
			firstName: 'Alice',
			lastName: 'Johnson',
			email: 'alice@gmail.com',
			phoneNumber: '+6192099105',
		},
		'bb-ee-ff': {
			id: 'bb-ee-ff',
			firstName: 'Charlie',
			lastName: 'Brown',
			email: 'charlie@gmail.com',
			phoneNumber: '+6192099106',
		},
		'cc-ff-gg': {
			id: 'cc-ff-gg',
			firstName: 'David',
			lastName: 'Williams',
			email: 'david@gmail.com',
			phoneNumber: '+6192099107',
		},
		'dd-gg-hh': {
			id: 'dd-gg-hh',
			firstName: 'Eva',
			lastName: 'Davis',
			email: 'eva@gmail.com',
			phoneNumber: '+6192099108',
		},
		'ee-hh-ii': {
			id: 'ee-hh-ii',
			firstName: 'Frank',
			lastName: 'Miller',
			email: 'frank@gmail.com',
			phoneNumber: '+6192099109',
		},
		'ff-ii-jj': {
			id: 'ff-ii-jj',
			firstName: 'Grace',
			lastName: 'Wilson',
			email: 'grace@gmail.com',
			phoneNumber: '+6192099110',
		},
		'gg-jj-kk': {
			id: 'gg-jj-kk',
			firstName: 'Harry',
			lastName: 'Moore',
			email: 'harry@gmail.com',
			phoneNumber: '+6192099111',
		},
		'hh-kk-ll': {
			id: 'hh-kk-ll',
			firstName: 'Ivy',
			lastName: 'Taylor',
			email: 'ivy@gmail.com',
			phoneNumber: '+6192099112',
		},
	},
};

export const addClient = (client: IClient) => {
	store.entities[client.id] = client;
};

export const updateClient = (client: IClient) => {
	store.entities[client.id] = client;
};

export const removeClient = (id: string) => {
	delete store.entities[id];
};

export const listClients = ({
	page = 1,
	perPage = 5,
	name = '',
	email = '',
	phoneNumber = '',
}: {
	page: number;
	perPage: number;
	name: string;
	email: string;
	phoneNumber: string;
}) => {
	const listAll: IClient[] = Object.keys(store.entities)
		.map((id) => {
			if (
				!!name &&
				!store.entities[id].firstName.toLowerCase().includes(name.toLowerCase()) &&
				!store.entities[id].lastName.toLowerCase().includes(name.toLowerCase())
			) {
				return {} as IClient;
			}

			if (!!email && !store.entities[id].email.toLowerCase().includes(email.toLowerCase())) {
				return {} as IClient;
			}

			if (!!phoneNumber && !store.entities[id].phoneNumber.includes(phoneNumber)) {
				return {} as IClient;
			}

			return store.entities[id];
		})
		.filter((client) => !!client.id);

	const list = listAll.slice((page - 1) * perPage, page * perPage);

	return {
		data: list.sort((a, b) => {
			if (a.firstName < b.firstName) {
				return -1;
			}
			if (a.firstName > b.firstName) {
				return 1;
			}
			return 0;
		}),
		meta: {
			total: listAll.length,
			page,
			perPage,
		},
	};
};
