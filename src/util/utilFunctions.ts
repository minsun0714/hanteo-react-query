export const hasConsecutiveNums = (pw: string) => {
	const consecutiveNums = [...Array(10)].map((_, i) => String(i).repeat(3));
	return consecutiveNums.some((num) => pw.includes(num));
};

const addPadding = (num: number) => {
	return String(num).padStart(2, '0');
};

export const formatDate = (date: Date) => {
	const year = date.getFullYear();
	const month = addPadding(date.getMonth() + 1);
	const day = addPadding(date.getDate());
	const hours = addPadding(date.getHours());
	const minutes = addPadding(date.getMinutes());
	const seconds = addPadding(date.getSeconds());

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
