import { useCallback, useContext, useEffect } from 'react';
import { Paper, Typography } from '@mui/material';
import { ACTIONS_CLIENTS, ClientsStateContext } from './ClientsDataProvider';
import Page from '../../components/Page';
import ClientTable from './ClientTable';
import { getClients } from '../../services/api';
import { locale as localeSource } from '../../locale';
import ClientMenu from './ClientMenu';
import ClientUpsertDialog from './ClientUpsertDialog';
import { GlobalStateContext } from '../../store/GlobalDataProvider';
import { checkEmailValidity, checkPhoneNumberValidity } from '../../utils/fieldVerifications';

const ClientsApp = () => {
	const { state: globalState } = useContext(GlobalStateContext);
	const { state, dispatch } = useContext(ClientsStateContext);
	const { clientsResponse, searchKeyword, currentPage, currentRowsPerPage } = state;
	const { locale } = globalState;
	const { clients: clientsLocale } = localeSource[locale] || localeSource['en'];
	const {
		tables: { list },
		dialogs,
	} = clientsLocale;

	const { data: clients, meta: clientsMeta } = clientsResponse;

	const handleGetClients = useCallback(() => {
		if (!!searchKeyword) {
			const params: IClientsListGetParams = {
				page: currentPage,
				perPage: currentRowsPerPage,
			};

			switch (true) {
				case !isNaN(parseInt(searchKeyword, 10)) || checkPhoneNumberValidity(searchKeyword):
					params.phoneNumber = searchKeyword;
					break;
				case checkEmailValidity(searchKeyword):
					params.email = searchKeyword;
					break;
				default:
					params.name = searchKeyword;
					break;
			}

			getClients(params).then((clientsResponse) =>
				dispatch({ type: ACTIONS_CLIENTS.FETCH, data: clientsResponse })
			);
		}
	}, [dispatch, currentPage, currentRowsPerPage, searchKeyword]);

	useEffect(() => {
		handleGetClients();
	}, [handleGetClients]);

	return (
		<Page>
			<Typography variant='h4' sx={{ textAlign: 'start' }} data-testid='table-clients-title'>
				{list.title}
			</Typography>
			<ClientMenu menuTexts={list.menus} clientsMeta={clientsMeta} />
			<Paper sx={{ margin: 'auto', marginTop: 3 }}>
				<ClientTable clients={clients} columnNames={list.columns} emptyMessage={list.emptyLabel} />
			</Paper>
			<ClientUpsertDialog dialogTexts={dialogs.upsert} onRefreshClients={handleGetClients} />
		</Page>
	);
};

export default ClientsApp;
