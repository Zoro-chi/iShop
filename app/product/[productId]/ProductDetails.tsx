"use client";

import { use, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Rating } from "@mui/material";

import SetColor from "../../components/products/SetColor";
import SetQuantity from "../../components/products/SetQuantity";
import Button from "../../components/Button";
import ProductImage from "../../components/products/ProductImage";
import { useCart } from "@/hooks/useCart";
import { MdCheckCircle } from "react-icons/md";

interface ProductDetailsProps {
	product: any;
}

export type CartProductType = {
	id: string;
	name: string;
	description: string;
	category: string;
	brand: string;
	selectedImg: SelectedImageType;
	quantity: number;
	price: number;
};

export type SelectedImageType = {
	color: string;
	colorCode: string;
	image: string;
};

const Horizonal = () => {
	return <hr className="w-[40%] my-2" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
	const { cartTotalQty, handleAddToCart, cartProducts } = useCart();
	const [isProductInCart, setIsProductInCart] = useState(false);
	const [cartProduct, setCartProduct] = useState<CartProductType>({
		id: product.id,
		name: product.name,
		description: product.description,
		category: product.category,
		brand: product.brand,
		selectedImg: { ...product.images[0] },
		quantity: 1,
		price: product.price,
	});
	const router = useRouter();

	console.log(cartTotalQty);
	console.log(cartProducts);

	useEffect(() => {
		setIsProductInCart(false);
		if (cartProducts) {
			const existingIndex = cartProducts.findIndex(
				(item) => item.id === product.id
			);
			if (existingIndex > -1) {
				setIsProductInCart(true);
			}
		}
	}, [cartProducts]);

	const productRating =
		product.reviews.reduce(
			(acc: number, review: any) => acc + review.rating,
			0
		) / product.reviews.length;

	const handleColorSelect = useCallback(
		(value: SelectedImageType) => {
			setCartProduct((prevState) => {
				return {
					...prevState,
					selectedImg: value,
				};
			});
		},
		[cartProduct.selectedImg]
	);

	const handleQtyIncrement = useCallback(() => {
		if (cartProduct.quantity === 10) return;

		setCartProduct((prevState) => {
			return {
				...prevState,
				quantity: prevState.quantity + 1,
			};
		});
	}, [cartProduct]);

	const handleQtyDecrement = useCallback(() => {
		if (cartProduct.quantity === 1) return;

		setCartProduct((prevState) => {
			return {
				...prevState,
				quantity: prevState.quantity - 1,
			};
		});
	}, [cartProduct]);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
			<ProductImage
				cartProduct={cartProduct}
				product={product}
				handleColorSelect={handleColorSelect}
			/>
			<div className="flex flex-col gap-1 text-slate-500 text-sm">
				<h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
				<div className="flex items-center gap-2">
					<Rating value={productRating} readOnly />
					<div>{product.reviews.length} reviews</div>
				</div>
				<Horizonal />
				<div className="text-justify">{product.description}</div>
				<Horizonal />
				<div>
					<span className="font-semibold"> CATEGORY: </span> {product.category}
				</div>
				<div>
					<span className="font-semibold"> BRAND: </span> {product.brand}
				</div>
				<div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
					{product.inStock ? "In Stock" : "Out Of Stock"}
				</div>
				<Horizonal />
				{isProductInCart ? (
					<>
						<p className="mb-2 text-slate-500 flex items-center gap-1">
							<MdCheckCircle className="text-teal-400" size={20} />
							<span> Product Added To Cart </span>
						</p>
						<div className="max-w-[300px]">
							<Button
								label="View Cart"
								onClick={() => router.push("/cart")}
								outline
								custom="hover:bg-teal-400 hover:text-white"
							/>
						</div>
					</>
				) : (
					<>
						<SetColor
							cartProduct={cartProduct}
							images={product.images}
							handleColorSelect={handleColorSelect}
						/>
						<Horizonal />
						<SetQuantity
							cartProduct={cartProduct}
							handleQtyIncrement={handleQtyIncrement}
							handleQtyDecrement={handleQtyDecrement}
						/>
						<Horizonal />
						<div className="max-w-[300px]">
							<Button
								label="Add To Cart"
								onClick={() => handleAddToCart(cartProduct)}
							/>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ProductDetails;
