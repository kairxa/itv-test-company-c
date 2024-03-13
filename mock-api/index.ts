import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';

import { store, addClient, updateClient, removeClient, listClients } from './data/store';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// on start
app.use(cors({ origin: true, credentials: true }));

// capture json
app.use(express.json());

app.listen(port, () => {
	console.log(`Mock API is running at http://localhost:${port}`);
});

// main page
app.get('/', (req: Request, res: Response) => {
	res.send('Mock API');
});

// get clients
app.get('/clients', (req: Request, res: Response) => {
	const page = parseInt(req.query.page as string, 10);
	const perPage = parseInt(req.query.perPage as string, 10);
	const name = req.query.name as string;
	const email = req.query.email as string;
	const phoneNumber = req.query.phoneNumber as string;
	res.send(listClients({ page, perPage, name, email, phoneNumber }));
});

// create client
app.post('/clients', (req: Request, res: Response) => {
	const client: IClient = { ...req.body, id: new Date().toISOString() };
	addClient({ ...client, id: uuid() });

	res.send(client);
});

// update client
app.put('/clients/:id', (req: Request, res: Response) => {
	const client: IClient = req.body;
	updateClient(client);

	res.send(client);
});
