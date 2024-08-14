"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { useCart } from "@/hooks/useCart";
import CheckoutForm from "./CheckoutForm";
import Button from "../components/Button";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CheckoutClient = () => {
	const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [clientSecret, setClientSecret] = useState("");
	const [paymentSuccess, setPaymentSuccess] = useState(false);
	const router = useRouter();

	console.log("paymentIntent", paymentIntent);
	console.log("clientSecret", clientSecret);

	useEffect(() => {
		if (cartProducts) {
			setLoading(true);
			setError(false);

			fetch("/api/create-payment-intent", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					items: cartProducts,
					payment_intent_id: paymentIntent,
				}),
			})
				.then((res) => {
					if (res.status === 401) return router.push("/login");
					return res.json();
				})
				.then((data) => {
					console.log("data", data);
					setClientSecret(data.paymentIntent.client_secret);
					handleSetPaymentIntent(data.paymentIntent.id);
					setLoading(false);
				})
				.catch((error) => {
					setError(true);
					console.log("Error", error);
					toast.error("Something went wrong. Please try again later.");
					setLoading(false);
				});
		} else {
			setLoading(false);
		}
	}, [cartProducts, paymentIntent]);

	const options: StripeElementsOptions = {
		clientSecret,
		appearance: {
			theme: "stripe",
			labels: "floating",
		},
	};

	const handleSetPaymentSuccess = useCallback((value: boolean) => {
		setPaymentSuccess(value);
	}, []);

	return (
		<div className="w-full">
			{clientSecret && cartProducts && (
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm
						clientSecret={clientSecret}
						handleSetPaymentSuccess={handleSetPaymentSuccess}
					/>
				</Elements>
			)}
			{loading && <div className="text-center">Loading Checkout ...</div>}
			{error && (
				<div className="text-center text-rose-500">Something Went Wrong...</div>
			)}
			{paymentSuccess && (
				<div className="flex items-center flex-col gap-4">
					<div className="text-center text-teal-500">Payment Successful</div>
					<div className="max-w-[220px] w-full">
						<Button
							label="View Your Orders"
							onClick={() => router.push("/cart")}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default CheckoutClient;
