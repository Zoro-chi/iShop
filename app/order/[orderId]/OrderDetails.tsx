"use client";

import { useRouter } from "next/navigation";

import { Order } from "@prisma/client";
import Heading from "../../components/Heading";
import { formatPrice } from "../../utils";
import Status from "../../components/Status";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import moment from "moment";
import OrderItem from "./OrderItem";

interface OrderDetailsProps {
	order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
	const router = useRouter();

	return (
		<div
			className="
        max-w-[1150px]
        m-auto
        flex
        flex-col
        gap-2
    "
		>
			<div className="mt-8">
				<Heading title="Order Details" />
			</div>
			<div> Order ID: {order.id} </div>
			<div>
				Total Amount:
				<span className="font-bold"> {formatPrice(order.amount)} </span>
			</div>
			<div className="flex gap-2 items-center">
				<div>Payment Status:</div>
				<div>
					{order.status === "pending" ? (
						<Status
							text="Pending"
							icon={MdAccessTimeFilled}
							bg="bg-slate-200 bg-opacity-0"
							color="bg-slate-700"
						/>
					) : order.status === "complete" ? (
						<Status
							text="Completed"
							icon={MdDone}
							bg="bg-green-200 bg-opacity-20"
							color="bg-green-700"
						/>
					) : (
						<></>
					)}
				</div>
			</div>
			<div className="flex gap-2 items-center">
				<div>Delivery Status:</div>
				<div>
					{order.deliveryStatus === "pending" ? (
						<Status
							text="Pending"
							icon={MdAccessTimeFilled}
							bg="bg-slate-200 bg-opacity-60"
							color="bg-slate-700"
						/>
					) : order.deliveryStatus === "dispatched" ? (
						<Status
							text="Dispatched"
							icon={MdDeliveryDining}
							bg="bg-purple-200 bg-opacity-60"
							color="bg-purple-700"
						/>
					) : order.deliveryStatus === "delivered" ? (
						<Status
							text="Delivered"
							icon={MdDone}
							bg="bg-green-200 bg-opacity-60"
							color="bg-green-700"
						/>
					) : (
						<></>
					)}
				</div>
			</div>
			<div>Date: {moment(order.createdAt).fromNow()}</div>
			<div>
				<h2 className="font-semibold mt-4 mb-2"> Products Ordered </h2>
				<div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
					<div className="col-span-2 justify-start"> PRODUCT </div>
					<div className="justify-center"> PRICE </div>
					<div className="justify-center"> QTY </div>
					<div className="justify-end"> TOTAL </div>
				</div>
				{order.products &&
					order.products.map((item) => {
						return <OrderItem key={item.id} item={item}></OrderItem>;
					})}
			</div>
		</div>
	);
};

export default OrderDetails;
