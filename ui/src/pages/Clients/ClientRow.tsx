import { Link, TableCell, TableRow } from '@mui/material';
import { formatPhoneNumber } from '../../utils/phoneNumberFormatter';

export interface IProps {
	client: IClient;
}

export default function ClientListItem({ client }: IProps) {
	const { id, firstName, lastName, email, phoneNumber } = client;
	const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

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
				<Link
					href={`/${id}`}
					underline='none'
					sx={{
						fontWeight: 600,
					}}
				>
					{firstName} {lastName}
				</Link>
			</TableCell>
			<TableCell data-testid='table-clients-row-phone-number'>{formattedPhoneNumber}</TableCell>
			<TableCell>{email}</TableCell>
		</TableRow>
	);
}
