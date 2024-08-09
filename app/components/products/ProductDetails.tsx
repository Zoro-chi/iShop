"use client";

import { useCallback, useState } from "react";
import { Rating } from "@mui/material";

import SetColor from "./SetColor";
import SetQuantity from "./SetQuantity";
import Button from "../Button";
import ProductImage from "./ProductImage";

interface ProductDetailsProps {
	product: any;
}

export type CartProductType = {
	id: string;
	name: string;
	desription: string;
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
	const [cartProduct, setCartProduct] = useState<CartProductType>({
		id: product.id,
		name: product.name,
		desription: product.description,
		category: product.category,
		brand: product.brand,
		selectedImg: { ...product.images[0] },
		quantity: 1,
		price: product.price,
	});

	console.log(cartProduct);

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
					<Button label="Add To Cart" onClick={() => {}} />
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
