export const en: ILocale = {
	clients: {
		tables: {
			list: {
				title: 'Clients',
				columns: {
					name: 'Name',
					phoneNumber: 'Phone Number',
					email: 'Email',
				},
				menus: {
					searchLabel: 'Search clients...',
					searchLabelAria: 'Search clients button',
					rowsPerPageLabel: 'Rows per page',
					createClientLabel: 'Create new client',
					paginationTooMuchLabel: 'Results too much? Refine your search keyword above.',
				},
				emptyLabel: 'No clients found. Please refine your keyword in the search bar above.',
			},
		},
		dialogs: {
			create: {
				title: 'Create new client',
				firstNameLabel: 'First Name',
				lastNameLabel: 'Last Name',
				emailLabel: 'Email',
				phoneNumberLabel: 'Phone Number',
				stepperPersonalDetailsLabel: 'Personal Details',
				stepperContactDetailsLabel: 'Contact Details',
				stepperPersonalDetailsButtonLabel: 'Continue',
				stepperContactDetailsButtonLabel: 'Create client',
				stepperContactDetailsButtonBackLabel: 'Back',
				errorPhoneNumberHelperText: 'Invalid phone number',
				errorEmailHelperText: 'Invalid email',
				createClientErrorMessage: 'Failed to create client',
				createClientSuccessMessage: 'Client created successfully',
			},
		},
	},
};
