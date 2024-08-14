import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import Stripe from "stripe";

import prisma from "../../libs/prismaDb";

export const config = {
	api: {
		bodyParser: false,
	},
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2024-06-20",
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const buf = await buffer(req);
	const sig = req.headers["stripe-signature"];

	if (!sig) {
		return res.status(400).send("No Stripe signature");
	}

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(
			buf,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET!
		);
	} catch (error: any) {
		return res.status(400).send(`Webhook Error: ${error.message}`);
	}

	switch (event.type) {
		case "charge.succeeded":
			const charge: any = event.data.object as Stripe.Charge;
			console.log("charge", charge);

			if (typeof charge.payment_intent === "string") {
				await prisma?.order.update({
					where: {
						paymentIntentId: charge.payment_intent,
					},
					data: {
						status: "complete",
						address: {
							set: charge.shipping?.address,
						},
					},
				});
			}
			break;
		default:
			console.log(`Unhandled event type ${event.type}`);
			break;
	}
	res.json({ received: true });
}
