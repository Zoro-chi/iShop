import prisma from "../libs/prismaDb";
import moment from "moment";

export default async function getGraphData() {
	try {
		// Get the last 7 days data
		const startDate = moment().subtract(6, "days").startOf("day");
		const endDate = moment().endOf("day");

		// Query the db to get order data grouped by createdAt
		const result = await prisma.order.groupBy({
			by: ["createdAt"],
			where: {
				createdAt: {
					gte: startDate.toISOString(),
					lte: endDate.toISOString(),
				},
				status: "complete",
			},
			_sum: {
				amount: true,
			},
		});

		// Initialize Object to aggregrate the data by day
		const aggregatedData: {
			[day: string]: { day: string; date: string; totalAmount: number };
		} = {};

		// Create clone of startDate to iterate over each day
		const currentDate = startDate.clone();

		// Iterate over each day in the date range
		while (currentDate <= endDate) {
			// Get the day as string (e.g. Monday, Tuesday)
			const day = currentDate.format("dddd");
			console.log("Day: ", day);

			// Initialize the data for the day
			aggregatedData[day] = {
				day,
				date: currentDate.format("YYYY-MM-DD"),
				totalAmount: 0,
			};
			// Move to the next day
			currentDate.add(1, "day");
		}

		// Calculate the total amount for each day by summing the order amounts
		result.forEach((order) => {
			const day = moment(order.createdAt).format("dddd");
			const amount = order._sum.amount || 0;
			aggregatedData[day].totalAmount += amount;
		});

		// Convert the aggregated data to an array and sort by date
		const formattedData = Object.values(aggregatedData).sort((a, b) =>
			moment(a.date).diff(moment(b.date))
		);

		return formattedData;
	} catch (error: any) {
		throw new Error(error);
	}
}
