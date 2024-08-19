"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { toast } from "react-hot-toast";

import { CartProductType } from "../app/product/[productId]/ProductDetails";

type CartContextType = {
	cartTotalQty: number;
	cartTotalPrice: number;
	cartProducts: CartProductType[] | null;
	handleAddToCart: (product: CartProductType) => void;
	handleRemoveFromCart: (product: CartProductType) => void;
	handleCartQtyIncrement: (product: CartProductType) => void;
	handleCartQtyDecrement: (product: CartProductType) => void;
	handleClearCart: () => void;
	paymentIntent: string | null;
	handleSetPaymentIntent: (val: string | null) => void;
};

interface Props {
	[propName: string]: any;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider: any = (props: Props) => {
	const [cartTotalQty, setCartTotalQty] = useState(0);
	const [cartTotalPrice, setCartTotalPrice] = useState(0);
	const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
		null
	);
	const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

	useEffect(() => {
		const cartItems: any = localStorage.getItem("iShopItems");
		const cartProducts: CartProductType[] | null = JSON.parse(cartItems);
		const iShopPaymentIntent: any = JSON.parse(
			localStorage.getItem("iShopPaymentIntent")!
		);
		setCartProducts(cartProducts);
		setPaymentIntent(iShopPaymentIntent);
	}, []);

	useEffect(() => {
		const getTotals = () => {
			if (!cartProducts) return;
			const { totalPrice, totalQty } = cartProducts?.reduce(
				(acc, item) => {
					const itemTotalPrice = item.price * item.quantity;
					acc.totalPrice += itemTotalPrice;
					acc.totalQty += item.quantity;
					return acc;
				},
				{
					totalQty: 0,
					totalPrice: 0,
				}
			);
			setCartTotalQty(totalQty);
			setCartTotalPrice(totalPrice);
		};
		getTotals();
	}, [cartProducts]);

	const handleAddToCart = useCallback((product: CartProductType) => {
		setCartProducts((prev) => {
			let updatedCart;
			if (prev) {
				updatedCart = [...prev, product];
			} else {
				updatedCart = [product];
			}
			localStorage.setItem("iShopItems", JSON.stringify(updatedCart));
			return updatedCart;
		});
		toast.success("Product added to cart");
	}, []);

	const handleRemoveFromCart = useCallback(
		(product: CartProductType) => {
			if (!cartProducts) return;
			const updatedCart = cartProducts.filter((item) => item.id !== product.id);
			setCartProducts(updatedCart);
			localStorage.setItem("iShopItems", JSON.stringify(updatedCart));
			toast.success("Product removed from cart");
		},
		[cartProducts]
	);

	const handleCartQtyIncrement = useCallback(
		(product: CartProductType) => {
			let updatedCart;
			if (product.quantity >= 10) {
				return toast.error("Maximum quantity reached");
			}
			if (cartProducts) {
				updatedCart = [...cartProducts];
				const productIndex = updatedCart.findIndex(
					(item) => item.id === product.id
				);
				if (productIndex > -1) updatedCart[productIndex].quantity += 1;
				setCartProducts(updatedCart);
				localStorage.setItem("iShopItems", JSON.stringify(updatedCart));
			}
		},
		[cartProducts]
	);

	const handleCartQtyDecrement = useCallback(
		(product: CartProductType) => {
			let updatedCart;
			if (product.quantity <= 1) {
				return toast.error("Minimum quantity reached");
			}

			if (cartProducts) {
				updatedCart = [...cartProducts];
				const productIndex = updatedCart.findIndex(
					(item) => item.id === product.id
				);
				if (productIndex > -1) {
					if (updatedCart[productIndex].quantity <= 1) {
						return;
					}
					updatedCart[productIndex].quantity -= 1;
				}
				setCartProducts(updatedCart);
				localStorage.setItem("iShopItems", JSON.stringify(updatedCart));
			}
		},
		[cartProducts]
	);

	const handleClearCart = useCallback(() => {
		setCartProducts(null);
		setCartTotalQty(0);
		localStorage.removeItem("iShopItems");
	}, [cartProducts]);

	const handleSetPaymentIntent = useCallback(
		(val: string | null) => {
			setPaymentIntent(val);
			localStorage.setItem("iShopPaymentIntent", JSON.stringify(val));
		},
		[paymentIntent]
	);

	const value = {
		cartTotalQty,
		cartProducts,
		cartTotalPrice,
		handleAddToCart,
		handleRemoveFromCart,
		handleCartQtyIncrement,
		handleCartQtyDecrement,
		handleClearCart,
		paymentIntent,
		handleSetPaymentIntent,
	};

	return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartContextProvider");
	}
	return context;
};
