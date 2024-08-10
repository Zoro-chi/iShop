import Container from "@/app/components/Container";
import ListRatings from "@/app/components/products/ListRatings";
import ProductDetails from "@/app/components/products/ProductDetails";
import { products } from "@/app/utils";

interface IParams {
	productId?: string;
}

const Product = ({ params }: { params: IParams }) => {
	const { productId } = params;
	const product = products.find((product) => product.id === productId);

	return (
		<div className="p-8">
			<Container>
				<ProductDetails product={product} />
				<div className="flex flex-col mt-20 gap-4">
					<div> Add Rating </div>
					<ListRatings product={product} />
				</div>
			</Container>
		</div>
	);
};

export default Product;
