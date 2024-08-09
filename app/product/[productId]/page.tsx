import Container from "@/app/components/Container";
import ListRatings from "@/app/components/products/ListRatings";
import ProductDetails from "@/app/components/products/ProductDetails";
import { product } from "@/app/utils";

interface IParams {
	productId?: string;
}

const Product = ({ params }: { params: IParams }) => {
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
