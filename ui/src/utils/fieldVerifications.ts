export const checkEmailValidity = (email: string) => {
	const emailRegex = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
	return emailRegex.test(email);
};

export const checkPhoneNumberValidity = (phone: string) => {
	const phoneRegex = /^(\+)?\d{8,14}$/; // not actual regex for phones, not that important right now
	return phoneRegex.test(phone);
};
