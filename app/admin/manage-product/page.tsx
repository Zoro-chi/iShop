export const dynamic = "force-dynamic";

import ManageProductClient from "./ManageProductClient";
import Container from "@/app/components/Container";
import getProducts from "@/actions/getProducts";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

const ManageProduct = async () => {
	const products = await getProducts({ category: null });
	const currentUser = await getCurrentUser();

	if (!currentUser) return <NullData title="Un-Authorized Access" />;
	if (currentUser.role !== "ADMIN")
		return <NullData title="Un-Authorized Access" />;

	return (
		<div className="pt-8">
			<Container>
				<ManageProductClient products={products} />
			</Container>
		</div>
	);
};

export default ManageProduct;
