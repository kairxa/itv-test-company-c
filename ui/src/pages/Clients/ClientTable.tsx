import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ClientRow from './ClientRow';

export default function BasicTable({
	clients,
	columnNames,
	emptyMessage,
}: {
	clients: IClient[];
	columnNames: IClientsTableColumnsNames;
	emptyMessage: string;
}) {
	return (
		<TableContainer component={Paper} sx={{ maxWidth: '100%' }}>
			<Table sx={{ minWidth: 400 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell>{columnNames.name}</TableCell>
						<TableCell>{columnNames.phoneNumber}</TableCell>
						<TableCell>{columnNames.email}</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{clients.map((client) => (
						<ClientRow key={client.id} client={client} />
					))}
					{!clients ||
						(!clients.length && (
							<TableRow sx={{ padding: 3 }}>
								<TableCell component='th' scope='row' data-testid='table-empty'>
									{emptyMessage}
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
