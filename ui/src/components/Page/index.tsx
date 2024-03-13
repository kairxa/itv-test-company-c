import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useContext } from 'react';
import { GlobalStateContext } from '../../store/GlobalDataProvider';

export default function Page({ children }: { children?: React.ReactNode }) {
	const { state, dispatch } = useContext(GlobalStateContext);
	const { locale } = state;

	const handleLocaleChange = (locale: Locale) => dispatch({ type: 'LOCALE_CHANGE', data: locale });

	return (
		<Box
			component='article'
			sx={{
				p: 4,
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Box component='section' sx={{ flex: '1' }}>
				{children}
			</Box>
			<Box component='footer' sx={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button
					sx={{ opacity: locale === 'en' ? '1' : '0.3' }}
					onClick={() => handleLocaleChange('en')}
					aria-label='Change to English'
				>
					EN
				</Button>
				<Button
					sx={{ opacity: locale === 'id' ? '1' : '0.3' }}
					onClick={() => handleLocaleChange('id')}
					aria-label='Ubah ke Bahasa Indonesia'
				>
					ID
				</Button>
			</Box>
		</Box>
	);
}
