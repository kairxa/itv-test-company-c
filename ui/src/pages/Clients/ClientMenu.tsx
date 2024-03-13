import {
	Box,
	Button,
	Grid,
	IconButton,
	InputAdornment,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
	Typography,
} from '@mui/material';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import { FormEvent, useContext, useState } from 'react';
import Pagination from '../../components/Pagination';
import { ACTIONS_CLIENTS, ClientsStateContext } from './ClientsDataProvider';

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50, 100];

const ClientMenu = ({ menuTexts, clientsMeta }: { menuTexts: IClientsTableMenuTexts; clientsMeta: IResponseMeta }) => {
	const { state, dispatch } = useContext(ClientsStateContext);
	const { createClientLabel, rowsPerPageLabel, searchLabel, searchLabelAria } = menuTexts;

	const handleSetRowsPerPage = (e: SelectChangeEvent<number>) => {
		dispatch({ type: ACTIONS_CLIENTS.LIST_ROWS_PER_PAGE_CHANGE, data: e.target.value });
	};
	const handleSetCurrentPage = (page: number) => {
		dispatch({ type: ACTIONS_CLIENTS.LIST_PAGE_CHANGE, data: page });
	};
	const handleClientUpsertDialogOpen = () => {
		dispatch({ type: ACTIONS_CLIENTS.UPSERT_DIALOG_TYPE_CHANGE, data: 'create' });
		dispatch({
			type: ACTIONS_CLIENTS.SET_SELECTED_CLIENT,
			data: { id: '', firstName: '', lastName: '', email: '', phoneNumber: '' },
		});
		dispatch({ type: ACTIONS_CLIENTS.UPSERT_DIALOG_TOGGLE, data: true });
	};

	// Both local state and handleSubmit can be deleted if we want to use debounce instead.
	const [keyword, setKeyword] = useState(state.searchKeyword);
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch({ type: ACTIONS_CLIENTS.SEARCH_KEYWORD_CHANGE, data: keyword });
	};

	return (
		<Grid container spacing={2} sx={{ mt: 4 }}>
			<Grid item xs={12} sm={6} md={4}>
				<form onSubmit={handleSubmit}>
					<TextField
						id='table-client-input-search'
						defaultValue={state.searchKeyword}
						onChange={(e) => setKeyword(e.target.value)}
						aria-placeholder={searchLabel}
						label={searchLabel}
						variant='outlined'
						size='small'
						sx={{
							backgroundColor: 'white',
							borderStyle: 'none',
							width: '100%',
						}}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										aria-label={searchLabelAria}
										type='submit'
										disabled={keyword.length === 0}
									>
										<SearchOutlined />
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</form>
			</Grid>
			<Box component={Grid} item md={4} sx={{ display: { xs: 'none', sm: 'none', md: 'inline-flex' } }} />
			<Grid item xs={12} sm={6} md={4}>
				<Button
					variant='contained'
					size='large'
					fullWidth
					onClick={handleClientUpsertDialogOpen}
					aria-label={createClientLabel}
				>
					{createClientLabel}
				</Button>
			</Grid>
			<Grid
				item
				xs={12}
				sm={12}
				md={12}
				sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
			>
				<Typography variant='overline'>{rowsPerPageLabel}</Typography>
				<Select
					data-testid='table-client-select-rows-per-page'
					autoWidth
					size='small'
					sx={{ ml: 2 }}
					defaultValue={5}
					onChange={(e) => handleSetRowsPerPage(e)}
				>
					{ROWS_PER_PAGE_OPTIONS.map((option, idx) => (
						<MenuItem key={idx} value={option}>
							{option}
						</MenuItem>
					))}
				</Select>
				<Pagination meta={clientsMeta} onChange={handleSetCurrentPage} />
			</Grid>
		</Grid>
	);
};

export default ClientMenu;
