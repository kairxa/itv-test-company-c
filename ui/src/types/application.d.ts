interface ILocale {
	clients: IClientsLocale;
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
