import prisma from "../../../libs/prismaDb";
import { NextResponse } from "next/server";

import { getCurrentUser } from "@/actions/getCurrentUser";

export async function PUT(req: Request) {
	const currentUser = await getCurrentUser();
	if (!currentUser) return NextResponse.error();
	if (currentUser.role !== "ADMIN") return NextResponse.error();

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
