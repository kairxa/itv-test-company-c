import { Button, TableCell, TableRow } from '@mui/material';
import { formatPhoneNumber } from '../../utils/phoneNumberFormatter';
import { useContext } from 'react';
import { ACTIONS_CLIENTS, ClientsStateContext } from './ClientsDataProvider';

export interface IProps {
	client: IClient;
}

export default function ClientListItem({ client }: IProps) {
	const { dispatch } = useContext(ClientsStateContext);
	const { id, firstName, lastName, email, phoneNumber } = client;
	const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

	const handleClientEditDialogOpen = () => {
		dispatch({ type: ACTIONS_CLIENTS.UPSERT_DIALOG_TYPE_CHANGE, data: 'edit' });
		dispatch({ type: ACTIONS_CLIENTS.UPSERT_DIALOG_TOGGLE, data: true });
		dispatch({ type: ACTIONS_CLIENTS.SET_SELECTED_CLIENT, data: client });
	};

	return (
		<TableRow
			key={id}
			sx={{
				'&:last-child td, &:last-child th': { border: 0 },
				cursor: 'pointer',
				'&:hover': {
					backgroundColor: '#f5f5f5',
				},
			}}
		>
			<TableCell component='th' scope='row' data-testid='table-clients-row-name'>
				<Button
					aria-label={`Edit ${firstName} ${lastName}`}
					onClick={handleClientEditDialogOpen}
					sx={{ textTransform: 'capitalize', fontWeight: 600, p: 0 }}
				>
					{firstName} {lastName}
				</Button>
			</TableCell>
			<TableCell data-testid='table-clients-row-phone-number'>{formattedPhoneNumber}</TableCell>
			<TableCell>{email}</TableCell>
		</TableRow>
	);
}
