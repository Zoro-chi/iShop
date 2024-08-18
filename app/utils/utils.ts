export const formatPrice = (amount: number) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(amount);
};

export const truncateString = (str: string) => {
	if (str.length > 25) {
		return str.substring(0, 25) + "...";
	} else {
		return str;
	}
};

export const formatNumber = (num: number) => {
	return new Intl.NumberFormat("en-us").format(num);
};
