import Image from "next/image";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import { products, truncateString } from "./utils";
import ProductsCard from "./components/products/ProductsCard";

export default function Home() {
	return (
		<div className="p-8">
			<Container>
				<div>
					<HomeBanner />
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap:8">
						{products.map((product: any, index: number) => {
							return <ProductsCard data={product} key={index} />;
						})}
					</div>
				</div>
			</Container>
		</div>
	);
}
