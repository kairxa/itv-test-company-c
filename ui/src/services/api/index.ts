import apiClient from './apiClient';

export const getClients = (params: IClientsListGetParams): Promise<IClient[]> => {
	return apiClient.get<IClient[]>('clients', params);
};

export const createClient = (client: IClient): Promise<void> => {
	return apiClient.post<void>('clients', client);
};

export const updateClient = (client: IClient): Promise<void> => {
	return apiClient.put<void>(`clients/${client.id}`, client);
};
