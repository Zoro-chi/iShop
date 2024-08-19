import Stripe from "stripe";
import { NextResponse } from "next/server";

import prisma from "../../../libs/prismaDb";
import { CartProductType } from "../../product/[productId]/ProductDetails";
import { getCurrentUser } from "@/actions/getCurrentUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2024-06-20",
});

const calaculateOrderAmount = async (items: CartProductType[]) => {
	const totalPrice = items.reduce((acc, item) => {
		return acc + item.price * item.quantity;
	}, 0);

	const price: any = totalPrice.toFixed(2);
	return price;
};

export async function POST(req: Request) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.json({ error: "No User Found" }, { status: 404 });
	}

	const body = await req.json();
	const { items, payment_intent_id } = body;

	const total = (await calaculateOrderAmount(items)) * 100;
	const orderData = {
		user: { connect: { id: currentUser.id } },
		amount: total,
		currency: "usd",
		status: "pending",
		deliveryStatus: "pending",
		paymentIntentId: payment_intent_id,
		products: items,
	};

	if (payment_intent_id) {
		try {
			const current_intent = await stripe.paymentIntents.retrieve(
				payment_intent_id
			);
			if (current_intent) {
				const updatedIntent = await stripe.paymentIntents.update(
					payment_intent_id,
					{ amount: total }
				);

				// update order
				const [existing_order, update_order] = await Promise.all([
					prisma.order.findFirst({
						where: { paymentIntentId: payment_intent_id },
					}),
					prisma.order.update({
						where: { paymentIntentId: payment_intent_id },
						data: {
							amount: total,
							products: items,
						},
					}),
				]);

				if (!existing_order) {
					return NextResponse.json(
						{ error: "No Order Found" },
						{ status: 404 }
					);
				}

				return NextResponse.json({ paymentIntent: updatedIntent });
			}
		} catch (error: any) {
			console.log(error);
			return NextResponse.json({ error: "An Error Occured" }, { status: 500 });
		}
	} else {
		try {
			// create intent
			const paymentIntent = await stripe.paymentIntents.create({
				amount: total,
				currency: "usd",
				automatic_payment_methods: { enabled: true },
			});

			// create order
			orderData.paymentIntentId = paymentIntent.id;
			const order = await prisma.order.create({ data: orderData });

			return NextResponse.json({ paymentIntent });
		} catch (error: any) {
			console.log(error);
			// return NextResponse.error();
			return NextResponse.json({ error: "An error occurred" }, { status: 500 });
		}
	}
}
