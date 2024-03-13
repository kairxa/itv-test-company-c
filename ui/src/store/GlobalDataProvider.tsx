import React, { createContext, useReducer } from 'react';

const initialState: IGlobalState = {
	locale: 'en',
	alert: {
		severity: 'info',
		message: '',
		visible: false,
	},
};

export const ACTIONS_GLOBAL = {
	LOCALE_CHANGE: 'LOCALE_CHANGE',
	ALERT_VISIBILITY_CHANGE: 'ALERT_VISIBILITY_CHANGE',
};

type ActionGlobal = {
	type: (typeof ACTIONS_GLOBAL)[keyof typeof ACTIONS_GLOBAL];
	data: any;
};

export const GlobalStateContext = createContext<{
	state: IGlobalState;
	dispatch: React.Dispatch<ActionGlobal>;
}>(
	// @ts-ignore
	null
);

const reducer = (state: IGlobalState, action: ActionGlobal): IGlobalState => {
	switch (action.type) {
		case ACTIONS_GLOBAL.LOCALE_CHANGE:
			return { ...state, locale: action.data };
		case ACTIONS_GLOBAL.ALERT_VISIBILITY_CHANGE:
			return { ...state, alert: { ...action.data } };
		default:
			return state;
	}
};

export default function GlobalDataProvider({ children }: { children?: React.ReactNode }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<GlobalStateContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</GlobalStateContext.Provider>
	);
}
