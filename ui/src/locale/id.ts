export const id: ILocale = {
	clients: {
		tables: {
			list: {
				title: 'Klien',
				columns: {
					name: 'Nama',
					phoneNumber: 'Nomor Telepon',
					email: 'Email',
				},
				menus: {
					searchLabel: 'Cari klien...',
					searchLabelAria: 'Tombol cari klien',
					rowsPerPageLabel: 'Baris per halaman',
					createClientLabel: 'Buat klien baru',
					paginationTooMuchLabel:
						'Hasil pencarian terlalu banyak? Coba cari dengan kata kunci yang lebih spesifik.',
				},
				emptyLabel: 'Tidak ada klien ditemukan. Pastikan kata kunci di kotak pencarian sudah tepat.',
			},
		},
		dialogs: {
			create: {
				title: 'Buat klien baru',
				firstNameLabel: 'Nama Depan',
				lastNameLabel: 'Nama Belakang',
				emailLabel: 'Email',
				phoneNumberLabel: 'Nomor Telepon',
				stepperPersonalDetailsLabel: 'Detail Pribadi',
				stepperContactDetailsLabel: 'Detail Kontak',
				stepperPersonalDetailsButtonLabel: 'Lanjutkan',
				stepperContactDetailsButtonLabel: 'Buat klien',
				stepperContactDetailsButtonBackLabel: 'Kembali',
				errorPhoneNumberHelperText: 'Nomor telepon tidak valid',
				errorEmailHelperText: 'Email tidak valid',
				createClientErrorMessage: 'Gagal membuat klien',
				createClientSuccessMessage: 'Klien berhasil dibuat',
			},
		},
	},
};
