// export const dynamic = "force-dynamic";

import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductsCard from "./components/products/ProductsCard";
import getProducts, { IProductParams } from "@/actions/getProducts";
import NullData from "./components/NullData";

interface HomeProps {
	searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
	const products = await getProducts(searchParams);

	if (products.length === 0) return <NullData title="No products found" />;

	const shuffleArray = (array: any) => {
		for (let i = array.lenght - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	};

	const shuffledProducts = shuffleArray(products);

	return (
		<div className="p-8">
			<Container>
				<div>
					<HomeBanner />
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap:8">
						{shuffledProducts.map((product: any) => {
							return <ProductsCard data={product} key={product.id} />;
						})}
					</div>
				</div>
			</Container>
		</div>
	);
}
