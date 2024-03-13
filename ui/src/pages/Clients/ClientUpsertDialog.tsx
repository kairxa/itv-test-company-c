import { Box, Button, Dialog, DialogTitle, IconButton, Step, StepLabel, Stepper, TextField } from '@mui/material';
import { ACTIONS_CLIENTS, ClientsStateContext } from './ClientsDataProvider';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { ArrowBack, Close } from '@mui/icons-material';
import { checkEmailValidity, checkPhoneNumberValidity } from '../../utils/fieldVerifications';
import { createClient, updateClient } from '../../services/api';
import { ACTIONS_GLOBAL, GlobalStateContext } from '../../store/GlobalDataProvider';

interface Props {
	dialogTexts: IClientsDialogUpsertTexts;
	onRefreshClients: () => void;
}

const PERSONAL_DETAILS_STEP = 0;
const CONTACT_DETAILS_STEP = 1;

const ClientUpsertDialog = ({ dialogTexts, onRefreshClients }: Props) => {
	const { dispatch: globalDispatch } = useContext(GlobalStateContext);
	const { state, dispatch } = useContext(ClientsStateContext);
	const { isUpsertDialogOpen, upsertDialogType, selectedClient } = state;

	const { id, firstName, lastName, email, phoneNumber } = selectedClient;
	const [isEmailTouched, setEmailTouched] = useState(false);
	const [isPhoneNumberTouched, setPhoneNumberTouched] = useState(false);

	const isPersonalDetailNextButtonDisabled = !firstName || !lastName;
	const isEmailValid = checkEmailValidity(email);
	const shouldShowEmailError = !isEmailValid && isEmailTouched;
	const isPhoneNumberValid = checkPhoneNumberValidity(phoneNumber);
	const shouldShowPhoneNumberError = !isPhoneNumberValid && isPhoneNumberTouched;
	const isContactDetailNextButtonDisabled = !isEmailValid || !isPhoneNumberValid;

	const [activeStep, setActiveStep] = useState(0);
	const handleChangeActiveStep = (step: number) => {
		setActiveStep(step);
	};
	useEffect(() => {
		setActiveStep(0);
	}, [setActiveStep, id]);

	const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) =>
		dispatch({
			type: ACTIONS_CLIENTS.SET_SELECTED_CLIENT,
			data: { ...selectedClient, firstName: e.target.value },
		});
	const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) =>
		dispatch({
			type: ACTIONS_CLIENTS.SET_SELECTED_CLIENT,
			data: { ...selectedClient, lastName: e.target.value },
		});
	const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmailTouched(true);
		dispatch({
			type: ACTIONS_CLIENTS.SET_SELECTED_CLIENT,
			data: { ...selectedClient, email: e.target.value },
		});
	};
	const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhoneNumberTouched(true);
		dispatch({
			type: ACTIONS_CLIENTS.SET_SELECTED_CLIENT,
			data: { ...selectedClient, phoneNumber: e.target.value },
		});
	};

	const handleCloseDialog = () => {
		dispatch({ type: ACTIONS_CLIENTS.UPSERT_DIALOG_TOGGLE, data: false });
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const submitFn = upsertDialogType === 'create' ? createClient : updateClient;

		try {
			await submitFn({ id, firstName, lastName, email, phoneNumber });
			handleCloseDialog();
			globalDispatch({
				type: ACTIONS_GLOBAL.ALERT_VISIBILITY_CHANGE,
				data: {
					severity: 'success',
					message: dialogTexts.successMessage[upsertDialogType],
					visible: true,
				},
			});
			onRefreshClients();
		} catch (err) {
			globalDispatch({
				type: ACTIONS_GLOBAL.ALERT_VISIBILITY_CHANGE,
				data: {
					severity: 'error',
					message: dialogTexts.errorMessage[upsertDialogType],
					visible: true,
				},
			});
		}
	};

	return (
		<Dialog open={isUpsertDialogOpen} onClose={handleCloseDialog} fullWidth={true}>
			<Box component='section' sx={{ display: 'flex', px: 4, pt: 2 }}>
				<DialogTitle sx={{ flex: '1', p: 0 }}>{dialogTexts.title[upsertDialogType]}</DialogTitle>
				<IconButton sx={{ p: 0 }} onClick={handleCloseDialog} aria-label={dialogTexts.buttonCloseLabel}>
					<Close />
				</IconButton>
			</Box>
			<Box component='section' sx={{ mt: 2, px: 2 }}>
				<Stepper activeStep={activeStep}>
					<Step>
						<StepLabel>{dialogTexts.stepperPersonalDetailsLabel}</StepLabel>
					</Step>
					<Step>
						<StepLabel>{dialogTexts.stepperContactDetailsLabel}</StepLabel>
					</Step>
				</Stepper>
			</Box>
			<Box component='section' sx={{ mt: 2, px: 4, pb: 2 }}>
				<form onSubmit={handleSubmit}>
					{activeStep === PERSONAL_DETAILS_STEP && (
						<>
							<TextField
								id='client-upsert-input-first-name'
								value={firstName}
								onChange={handleChangeFirstName}
								label={dialogTexts.firstNameLabel}
								variant='outlined'
								size='small'
								fullWidth
								margin='normal'
								required
							/>
							<TextField
								id='client-upsert-input-last-name'
								value={lastName}
								onChange={handleChangeLastName}
								label={dialogTexts.lastNameLabel}
								variant='outlined'
								size='small'
								fullWidth
								margin='normal'
								required
							/>
							<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
								<Button
									aria-label={dialogTexts.buttonContinueLabel}
									variant='contained'
									onClick={() => handleChangeActiveStep(CONTACT_DETAILS_STEP)}
									disabled={isPersonalDetailNextButtonDisabled}
								>
									{dialogTexts.buttonContinueLabel}
								</Button>
							</Box>
						</>
					)}
					{activeStep === CONTACT_DETAILS_STEP && (
						<>
							<TextField
								id='client-upsert-input-email'
								value={email}
								onChange={handleChangeEmail}
								label={dialogTexts.emailLabel}
								variant='outlined'
								size='small'
								fullWidth
								margin='normal'
								error={shouldShowEmailError}
								helperText={shouldShowEmailError ? dialogTexts.errorEmailHelperText : ''}
							/>
							<TextField
								id='client-upsert-input-phone-number'
								value={phoneNumber}
								onChange={handleChangePhoneNumber}
								label={dialogTexts.phoneNumberLabel}
								variant='outlined'
								size='small'
								fullWidth
								margin='normal'
								error={shouldShowPhoneNumberError}
								helperText={shouldShowPhoneNumberError ? dialogTexts.errorPhoneNumberHelperText : ''}
							/>
							<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
								<Box sx={{ display: 'flex', flex: '1' }}>
									<Button
										aria-label={dialogTexts.buttonBackLabel}
										onClick={() => handleChangeActiveStep(PERSONAL_DETAILS_STEP)}
										startIcon={<ArrowBack />}
									>
										{dialogTexts.buttonBackLabel}
									</Button>
								</Box>
								<Button
									aria-label={dialogTexts.buttonSubmitLabel[upsertDialogType]}
									type='submit'
									variant='contained'
									onClick={() => handleChangeActiveStep(CONTACT_DETAILS_STEP)}
									disabled={isContactDetailNextButtonDisabled}
								>
									{dialogTexts.buttonSubmitLabel[upsertDialogType]}
								</Button>
							</Box>
						</>
					)}
				</form>
			</Box>
		</Dialog>
	);
};

export default ClientUpsertDialog;
