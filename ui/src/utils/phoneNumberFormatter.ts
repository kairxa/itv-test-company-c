// Makes `phoneNumber` look like +61 920 991 02 or 092 099 102
export const formatPhoneNumber = (phoneNumber: string): string => {
    let formattedPhoneNumber = '';

    if (phoneNumber.startsWith('+')) {
        formattedPhoneNumber = phoneNumber.replace('+', '');
        formattedPhoneNumber = formattedPhoneNumber.replace(/(\d{2})(\d{3})(\d{3})(\d+)/, '+$1 $2 $3 $4');
    } else {
        formattedPhoneNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d+)/, '$1 $2 $3');
    }

    return formattedPhoneNumber
}
