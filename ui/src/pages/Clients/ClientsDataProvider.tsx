import React, { createContext, useReducer } from 'react';
import { useParams } from 'react-router-dom';

const initialState: IClientsState = {
	clientsResponse: { data: [], meta: { total: 0, perPage: 0, page: 0 } },
	searchKeyword: '',
	currentPage: 1,
	currentRowsPerPage: 5,
	isCreateDialogOpen: false,
};

export const ACTIONS_CLIENTS = {
	FETCH: 'FETCH',
	SEARCH_KEYWORD_CHANGE: 'SEARCH_KEYWORD_CHANGE',
	LIST_PAGE_CHANGE: 'LIST_PAGE_CHANGE',
	LIST_ROWS_PER_PAGE_CHANGE: 'LIST_ROWS_PER_PAGE_CHANGE',
	CREATE_DIALOG_TOGGLE: 'CREATE_DIALOG_TOGGLE',
	LOCALE_CHANGE: 'LOCALE_CHANGE',
};

type ActionClients = {
	type: (typeof ACTIONS_CLIENTS)[keyof typeof ACTIONS_CLIENTS];
	data: any;
};

export const ClientsStateContext = createContext<{
	state: IClientsState;
	dispatch: React.Dispatch<ActionClients>;
}>(
	// @ts-ignore
	null
);

const reducer = (state: IClientsState, action: ActionClients): IClientsState => {
	switch (action.type) {
		case ACTIONS_CLIENTS.FETCH:
			return { ...state, clientsResponse: action.data };
		case ACTIONS_CLIENTS.SEARCH_KEYWORD_CHANGE:
			return { ...state, searchKeyword: action.data };
		case ACTIONS_CLIENTS.LIST_PAGE_CHANGE:
			return { ...state, currentPage: action.data };
		case ACTIONS_CLIENTS.LIST_ROWS_PER_PAGE_CHANGE:
			return { ...state, currentRowsPerPage: action.data };
		case ACTIONS_CLIENTS.CREATE_DIALOG_TOGGLE:
			return { ...state, isCreateDialogOpen: !state.isCreateDialogOpen };
		default:
			return state;
	}
};

export default function ClientsDataProvider({ children }: { children?: React.ReactNode }) {
	const { keyword: initialSearchKeyword = '' } = useParams();
	initialState.searchKeyword = initialSearchKeyword;

	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<ClientsStateContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</ClientsStateContext.Provider>
	);
}
