"use client";

import {
	Chart as Chartjs,
	BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend,
	scales,
} from "chart.js";
import { Bar } from "react-chartjs-2";

Chartjs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BarGraphProps {
	data: GraphData[];
}

type GraphData = {
	day: string;
	date: string;
	totalAmount: number;
};

const BarGraph: React.FC<BarGraphProps> = ({ data }) => {
	const labels = data.map((item) => item.day);
	const amounts = data.map((item) => item.totalAmount);
	const chartData = {
		labels,
		datasets: [
			{
				label: "Sale Amount",
				data: amounts,
				backgroundColor: "rgba(75, 75, 192, 0.6)",
				borderColor: "rgba(75, 75, 192, 1)",
				borderWidth: 1,
			},
		],
	};

	const options = {
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					callback: function (value: string | number) {
						return `$${(Number(value) / 100).toFixed(2)}`;
					},
				},
			},
		},
	};

	return <Bar data={chartData} options={options}></Bar>;
};

export default BarGraph;
