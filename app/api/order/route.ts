// export const dynamic = "force-dynamic";

import prisma from "../../../libs/prismaDb";
import { NextResponse } from "next/server";

import { getCurrentUser } from "@/actions/getCurrentUser";

export async function PUT(req: Request) {
	const currentUser = await getCurrentUser();
	if (!currentUser)
		return NextResponse.json(
			{ error: "Un-Authorized Access" },
			{ status: 403 }
		);
	if (currentUser.role !== "ADMIN")
		return NextResponse.json(
			{ error: "Un-Authorized Access" },
			{ status: 403 }
		);

	const body = await req.json();
	const { id, deliveryStatus } = body;

	const order = await prisma.order.update({
		where: { id },
		data: {
			deliveryStatus,
		},
	});

	return NextResponse.json(order);
}
