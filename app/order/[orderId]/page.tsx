export const dynamic = "force-dynamic";

import getOrderById from "@/actions/getOrderById";
import Container from "@/app/components/Container";
import NullData from "@/app/components/NullData";
import OrderDetails from "./OrderDetails";

interface IParams {
	orderId?: string;
}

const Order = async ({ params }: { params: IParams }) => {
	const order = await getOrderById(params);

	if (!order) return <NullData title="Order not found" />;

	return (
		<div className="p-8">
			<Container>
				<OrderDetails order={order} />
				<div className="flex flex-col mt-20 gap-4"></div>
			</Container>
		</div>
	);
};

export default Order;
