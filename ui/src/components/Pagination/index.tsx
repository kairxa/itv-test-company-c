import React from 'react';
import { Pagination as MUIPagination, Typography } from '@mui/material';

// Maximum pages need to be limited so DB queries won't be uber long.
// Enforce user to refine keyword. This means search needs to include capability of
// using phone number and email.
const MAXIMUM_PAGES_ALLOWED = 50;

interface Props {
	meta: IResponseMeta;
	onChange: (page: number) => void;
}
const Pagination = ({ meta, onChange }: Props) => {
	const { total, perPage } = meta;
	let totalPages = Math.ceil(total / perPage) || 1;
	if (totalPages > MAXIMUM_PAGES_ALLOWED) {
		totalPages = MAXIMUM_PAGES_ALLOWED;
	}

	return (
		<>
			<MUIPagination count={totalPages} onChange={(_, value) => onChange(value)} color='primary' />
			{totalPages === MAXIMUM_PAGES_ALLOWED && (
				<Typography></Typography>
			)}
		</>
	);
};

export default Pagination;
