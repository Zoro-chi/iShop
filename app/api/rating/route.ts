// export const dynamic = "force-dynamic";

import { getCurrentUser } from "@/actions/getCurrentUser";
import { Review } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser)
			return NextResponse.json(
				{ error: "Un-Authorized Access" },
				{ status: 403 }
			);
		const body = await req.json();
		const { comment, rating, product, userId } = body;

		const deliveredOrder = currentUser?.orders.some(
			(order) =>
				order.products.find((item) => item.id === product.id) &&
				order.deliveryStatus === "delivered"
		);

		const userReview = product?.reviews.find((review: Review) => {
			return review.userId === currentUser.id;
		});

		if (userReview || !deliveredOrder) {
			return NextResponse.json(
				{ error: "Unable to leave rating" },
				{ status: 400 }
			);
		}

		const review = await prisma.review.create({
			data: {
				comment,
				rating,
				productId: product.id,
				userId,
			},
		});
		return NextResponse.json(review);
	} catch (error: any) {
		console.log(error);
		return NextResponse.json({ error: "An error occurred" }, { status: 500 });
	}
}
