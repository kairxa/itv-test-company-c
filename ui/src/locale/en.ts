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
			upsert: {
				title: {
					create: 'Create new client',
					edit: 'Edit client',
				},
				firstNameLabel: 'First Name',
				lastNameLabel: 'Last Name',
				emailLabel: 'Email',
				phoneNumberLabel: 'Phone Number',
				stepperPersonalDetailsLabel: 'Personal Details',
				stepperContactDetailsLabel: 'Contact Details',
				errorPhoneNumberHelperText: 'Invalid phone number',
				errorEmailHelperText: 'Invalid email',
				errorMessage: {
					create: 'Failed to create client',
					edit: 'Failed to edit client',
				},
				successMessage: {
					create: 'Client created successfully',
					edit: 'Client edited successfully',
				},
				buttonContinueLabel: 'Continue',
				buttonSubmitLabel: {
					create: 'Create client',
					edit: 'Edit client',
				},
				buttonBackLabel: 'Back',
				buttonCloseLabel: 'Close',
			},
		},
	},
};
