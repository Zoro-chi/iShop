"use client";

import React from "react";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

import { useCart } from "../../hooks/useCart";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ProductContent from "./ProductContent";
import { formatPrice } from "../utils";

const CartClient = () => {
	const { cartProducts, handleClearCart, cartTotalPrice } = useCart();

	if (!cartProducts || cartProducts.length === 0) {
		return (
			<div className="flex flex-col items-center">
				<div className="text-2xl font-semibold">Your cart is empty</div>
				<div>
					<Link
						href={"/"}
						className="text-slate-500 flex items-center gap-1 mt-2"
					>
						<MdArrowBack />
						<span className="text-slate-500">Start shopping</span>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div>
			<Heading title="Shopping Cart" center />
			<div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
				<div className="col-span-2 justify-self-start "> PRODUCT </div>
				<div className="justify-self-center"> PRICE </div>
				<div className="justify-self-center"> QUANTITY </div>
				<div className="justify-self-end"> TOTAL </div>
			</div>
			<div>
				{cartProducts &&
					cartProducts.map((product) => {
						return <ProductContent key={product.id} product={product} />;
					})}
			</div>
			<div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
				<div className="w-[90px]">
					<Button
						label="Clear Cart"
						onClick={() => handleClearCart()}
						small
						outline
					/>
				</div>
				<div className="text-sm flex flex-col items-start gap-1">
					<div className="flex justify-between w-full text-base font-semibold">
						<span> Subtotal </span>
						<span> {formatPrice(cartTotalPrice)} </span>
					</div>
					<p className="text-slate-500">
						Taxes and Shipping Calculated At Checkout
					</p>
					<Button label="Checkout" onClick={() => {}} />
					<Link
						href={"/"}
						className="text-slate-500 flex items-center gap-1 mt-2"
					>
						<MdArrowBack />
						<span className="text-slate-500">Continue shopping</span>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default CartClient;
