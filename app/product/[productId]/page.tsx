import getProductById from "@/actions/getProductById";
import Container from "@/app/components/Container";
import NullData from "@/app/components/NullData";
import ListRatings from "./ListRatings";
import ProductDetails from "./ProductDetails";
import AddRatings from "./AddRatings";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface IParams {
	productId?: string;
}

const Product = async ({ params }: { params: IParams }) => {
	const product = await getProductById(params);
	const user = await getCurrentUser();

	if (!product) return <NullData title="No product found" />;

	return (
		<div className="p-8">
			<Container>
				<ProductDetails product={product} />
				<div className="flex flex-col mt-20 gap-4">
					<AddRatings product={product} user={user} />
					<ListRatings product={product} />
				</div>
			</Container>
		</div>
	);
};

export default Product;
