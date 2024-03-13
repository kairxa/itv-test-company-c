import { Box, Button, Dialog, DialogTitle, IconButton, Step, StepLabel, Stepper, TextField } from '@mui/material';
import { ACTIONS_CLIENTS, ClientsStateContext } from './ClientsDataProvider';
import { FormEvent, useContext, useState } from 'react';
import { ArrowBack, Close } from '@mui/icons-material';
import { checkEmailValidity, checkPhoneNumberValidity } from '../../utils/fieldVerifications';
import { createClient } from '../../services/api';
import { ACTIONS_GLOBAL, GlobalStateContext } from '../../store/GlobalDataProvider';

interface Props {
	dialogTexts: IClientsDialogCreateTexts;
	onRefreshClients: () => void;
}

const PERSONAL_DETAILS_STEP = 0;
const CONTACT_DETAILS_STEP = 1;

const ClientCreateDialog = ({ dialogTexts, onRefreshClients }: Props) => {
	const { dispatch: globalDispatch } = useContext(GlobalStateContext);
	const { state, dispatch } = useContext(ClientsStateContext);
	const { isCreateDialogOpen } = state;

	const [activeStep, setActiveStep] = useState(0);
	const handleChangeActiveStep = (step: number) => {
		setActiveStep(step);
	};

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState({ value: '', touched: false });
	const [phoneNumber, setPhoneNumber] = useState({ value: '', touched: false });

	const isPersonalDetailNextButtonDisabled = !firstName || !lastName;
	const isEmailValid = checkEmailValidity(email.value);
	const shouldShowEmailError = !isEmailValid && email.touched;
	const isPhoneNumberValid = checkPhoneNumberValidity(phoneNumber.value);
	const shouldShowPhoneNumberError = !isPhoneNumberValid && phoneNumber.touched;
	const isContactDetailNextButtonDisabled = !isEmailValid || !isPhoneNumberValid;

	const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value);
	const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value);
	const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
		setEmail({ value: e.target.value, touched: true });
	const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) =>
		setPhoneNumber({ value: e.target.value, touched: true });

	const handleCloseDialog = () => {
		dispatch({ type: ACTIONS_CLIENTS.CREATE_DIALOG_TOGGLE, data: !isCreateDialogOpen });
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await createClient({ firstName, lastName, email: email.value, phoneNumber: phoneNumber.value });
			handleCloseDialog();
			globalDispatch({
				type: ACTIONS_GLOBAL.ALERT_VISIBILITY_CHANGE,
				data: { severity: 'success', message: dialogTexts.createClientSuccessMessage, visible: true },
			});
			onRefreshClients();
		} catch (err) {
			globalDispatch({
				type: ACTIONS_GLOBAL.ALERT_VISIBILITY_CHANGE,
				data: { severity: 'error', message: dialogTexts.createClientErrorMessage, visible: true },
			});
		}
	};

	return (
		<Dialog open={isCreateDialogOpen} onClose={handleCloseDialog} fullWidth={true}>
			<Box component='section' sx={{ display: 'flex', px: 4, pt: 2 }}>
				<DialogTitle sx={{ flex: '1', p: 0 }}>{dialogTexts.title}</DialogTitle>
				<IconButton sx={{ p: 0 }} onClick={handleCloseDialog}>
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
								id='client-create-input-first-name'
								defaultValue={firstName}
								onChange={handleChangeFirstName}
								label={dialogTexts.firstNameLabel}
								variant='outlined'
								size='small'
								fullWidth
								margin='normal'
								required
							/>
							<TextField
								id='client-create-input-last-name'
								defaultValue={lastName}
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
									aria-label={dialogTexts.stepperPersonalDetailsButtonLabel}
									variant='contained'
									onClick={() => handleChangeActiveStep(CONTACT_DETAILS_STEP)}
									disabled={isPersonalDetailNextButtonDisabled}
								>
									{dialogTexts.stepperPersonalDetailsButtonLabel}
								</Button>
							</Box>
						</>
					)}
					{activeStep === CONTACT_DETAILS_STEP && (
						<>
							<TextField
								id='client-create-input-email'
								defaultValue={email.value}
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
								id='client-create-input-phone-number'
								defaultValue={phoneNumber.value}
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
										aria-label={dialogTexts.stepperContactDetailsButtonBackLabel}
										onClick={() => handleChangeActiveStep(PERSONAL_DETAILS_STEP)}
										startIcon={<ArrowBack />}
									>
										{dialogTexts.stepperContactDetailsButtonBackLabel}
									</Button>
								</Box>
								<Button
									aria-label={dialogTexts.stepperContactDetailsButtonLabel}
									type='submit'
									variant='contained'
									onClick={() => handleChangeActiveStep(CONTACT_DETAILS_STEP)}
									disabled={isContactDetailNextButtonDisabled}
								>
									{dialogTexts.stepperContactDetailsButtonLabel}
								</Button>
							</Box>
						</>
					)}
				</form>
			</Box>
		</Dialog>
	);
};

export default ClientCreateDialog;
