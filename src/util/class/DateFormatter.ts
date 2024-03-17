class DateFormatter {
	private static addPadding(num: number): string {
		return String(num).padStart(2, '0');
	}

	static formatDate(date: Date): string {
		const year = date.getFullYear();
		const month = this.addPadding(date.getMonth() + 1);
		const day = this.addPadding(date.getDate());
		const hours = this.addPadding(date.getHours());
		const minutes = this.addPadding(date.getMinutes());
		const seconds = this.addPadding(date.getSeconds());

		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	}
}
export default DateFormatter;
