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
			upsert: {
				title: {
					create: 'Buat klien baru',
					edit: 'Edit klien',
				},
				firstNameLabel: 'Nama Depan',
				lastNameLabel: 'Nama Belakang',
				emailLabel: 'Email',
				phoneNumberLabel: 'Nomor Telepon',
				stepperPersonalDetailsLabel: 'Detail Pribadi',
				stepperContactDetailsLabel: 'Detail Kontak',
				errorPhoneNumberHelperText: 'Nomor telepon tidak valid',
				errorEmailHelperText: 'Email tidak valid',
				errorMessage: {
					create: 'Gagal membuat klien',
					edit: 'Gagal mengedit klien',
				},
				successMessage: {
					create: 'Klien berhasil dibuat',
					edit: 'Klien berhasil diedit',
				},
				buttonContinueLabel: 'Lanjutkan',
				buttonSubmitLabel: {
					create: 'Buat klien',
					edit: 'Edit klien',
				},
				buttonBackLabel: 'Kembali',
				buttonCloseLabel: 'Tutup',
			},
		},
	},
};
