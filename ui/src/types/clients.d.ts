interface IClientsTableColumnsNames {
	name: string;
	phoneNumber: string;
	email: string;
}

interface IClientsTableMenuTexts {
	searchLabel: string;
	searchLabelAria: string;
	rowsPerPageLabel: string;
	createClientLabel: string;
	paginationTooMuchLabel: string;
}

interface IClientsDialogUpsertTexts {
	title: ILocaleUpsertLabelsComposition;
	firstNameLabel: string;
	lastNameLabel: string;
	emailLabel: string;
	phoneNumberLabel: string;
	stepperPersonalDetailsLabel: string;
	stepperContactDetailsLabel: string;
	errorPhoneNumberHelperText: string;
	errorEmailHelperText: string;
	successMessage: ILocaleUpsertLabelsComposition;
	errorMessage: ILocaleUpsertLabelsComposition;
	buttonContinueLabel: string;
	buttonSubmitLabel: ILocaleUpsertLabelsComposition;
	buttonBackLabel: string;
	buttonCloseLabel: string;
}

interface IClientsTableListTexts {
	title: string;
	columns: IClientsTableColumnsNames;
	menus: IClientsTableMenuTexts;
	emptyLabel: string;
}

interface IClientsTablesLocale {
	list: IClientsTableListTexts;
}

interface IClientsDialogsTexts {
	upsert: IClientsDialogUpsertTexts;
}

interface IClientsLocale {
	tables: IClientsTablesLocale;
	dialogs: IClientsDialogsTexts;
}

interface IClient {
	id?: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
}

interface IClientsListGetParams extends IListGetParamsBase {
	name?: string;
	phoneNumber?: string;
	email?: string;
}

type IClientListResponse = IGetResponse<IClient[]>;

type IClientDialogType = 'create' | 'edit';

interface IClientsState {
	clientsResponse: IClientListResponse;
	searchKeyword: string;
	currentPage: number;
	currentRowsPerPage: number;
	isUpsertDialogOpen: boolean;
	upsertDialogType: IClientDialogType;
	selectedClient: IClient;
}
