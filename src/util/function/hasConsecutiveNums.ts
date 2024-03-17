export const hasConsecutiveNums = (pw: string) => {
	const consecutiveNums = [...Array(10)].map((_, i) => String(i).repeat(3));
	return consecutiveNums.some((num) => pw.includes(num));
};
