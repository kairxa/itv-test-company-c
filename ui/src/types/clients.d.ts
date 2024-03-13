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

interface IClientsDialogCreateTexts {
	title: string;
	firstNameLabel: string;
	lastNameLabel: string;
	emailLabel: string;
	phoneNumberLabel: string;
	stepperPersonalDetailsLabel: string;
	stepperContactDetailsLabel: string;
	stepperPersonalDetailsButtonLabel: string;
	stepperContactDetailsButtonLabel: string;
	stepperContactDetailsButtonBackLabel: string;
	errorPhoneNumberHelperText: string;
	errorEmailHelperText: string;
	createClientSuccessMessage: string;
	createClientErrorMessage: string;
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
	create: IClientsDialogCreateTexts;
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

interface IClientsState {
	clientsResponse: IClientListResponse;
	searchKeyword: string;
	currentPage: number;
	currentRowsPerPage: number;
	isCreateDialogOpen: boolean;
}
