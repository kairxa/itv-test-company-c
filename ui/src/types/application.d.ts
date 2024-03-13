interface ILocale {
	clients: IClientsLocale;
}

interface ILocaleUpsertLabelsComposition {
	create: string;
	edit: string;
}

interface IAlert {
	severity: 'error' | 'warning' | 'info' | 'success';
	message: string;
	visible: boolean;
}

type Locale = 'en' | 'id';
interface IGlobalState {
	locale: Locale;
	alert: IAlert;
}
