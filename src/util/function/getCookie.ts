export const getCookie = (key: string) => {
	const cookieValue = `; ${document.cookie}`;
	const cookieArr = cookieValue
		.split('; ')
		.map((keyValue: string) => keyValue.split('='));
	return cookieArr.find(([cookieKey]) => cookieKey === key)?.[1];
};
