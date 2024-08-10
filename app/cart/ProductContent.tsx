"use client";

import Link from "next/link";
import Image from "next/image";

import { CartProductType } from "../components/products/ProductDetails";
import { formatPrice, truncateString } from "../utils";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";

interface ProductContentProps {
	product: CartProductType;
}

const ProductContent: React.FC<ProductContentProps> = ({ product }) => {
	const {
		handleRemoveFromCart,
		handleCartQtyIncrement,
		handleCartQtyDecrement,
	} = useCart();

	return (
		<div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
			<div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
				<Link href={`/product/${product.id}`}>
					<div className="relative w-[70px] aspect-square">
						<Image
							src={product.selectedImg.image}
							alt={product.name}
							fill
							className="object-contain "
						/>
					</div>
				</Link>
				<div className="flex flex-col justify-between">
					<Link href={`/product/${product.id}`}>
						{truncateString(product.name)}
					</Link>
					<div> {product.selectedImg.color} </div>
					<div className="w-[70px]">
						<button
							className="text-slate-500 underline"
							onClick={() => handleRemoveFromCart(product)}
						>
							Remove
						</button>
					</div>
				</div>
			</div>
			<div className="justify-self-center">{formatPrice(product.price)}</div>
			<div className="justify-self-center">
				<SetQuantity
					cartCounter={true}
					cartProduct={product}
					handleQtyIncrement={() => handleCartQtyIncrement(product)}
					handleQtyDecrement={() => handleCartQtyDecrement(product)}
				/>
			</div>
			<div className="justify-self-end font-semibold">
				{formatPrice(product.price * product.quantity)}
			</div>
		</div>
	);
};

export default ProductContent;
