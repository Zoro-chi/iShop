import React from "react";

import ManageOrdersClient from "./ManageOrdersClient";
import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getOrders from "@/actions/getOrders";

const ManageOrders = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) return <NullData title="Un-Authorized Access" />;
	if (currentUser.role !== "ADMIN")
		return <NullData title="Un-Authorized Access" />;

	const orders = await getOrders();

	return (
		<div className="pt-8">
			<Container>
				<ManageOrdersClient orders={orders} />
			</Container>
		</div>
	);
};

export default ManageOrders;
