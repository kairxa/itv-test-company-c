import MUIAlert from '@mui/material/Alert';
import Fade from '@mui/material/Fade';
import { useContext } from 'react';
import { ACTIONS_GLOBAL, GlobalStateContext } from '../../store/GlobalDataProvider';
import Box from '@mui/material/Box';

const TIMEOUT = 5000;

const Alert = () => {
	const { state: globalState, dispatch: globalDispatch } = useContext(GlobalStateContext);
	const { alert } = globalState;

	const handleTimeoutAlert = () => {
		setTimeout(() => {
			globalDispatch({ type: ACTIONS_GLOBAL.ALERT_VISIBILITY_CHANGE, data: { ...alert, visible: false } });
		}, TIMEOUT);
	};

	return (
		<Box sx={{ px: 4, position: 'fixed', left: '20vw', right: '20vw', bottom: '2rem', zIndex: 100 }}>
			<Fade in={alert.visible} addEndListener={handleTimeoutAlert}>
				<MUIAlert severity={alert.severity} data-testid='alert'>
					{alert.message}
				</MUIAlert>
			</Fade>
		</Box>
	);
};

export default Alert;
