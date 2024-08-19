// export const dynamic = "force-dynamic";

import prisma from "../../../libs/prismaDb";
import { NextResponse } from "next/server";

import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(req: Request) {
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
	const { name, description, price, brand, category, inStock, images } = body;

	const product = await prisma.product.create({
		data: {
			name,
			description,
			price: parseFloat(price),
			brand,
			category,
			inStock,
			images,
		},
	});

	return NextResponse.json(product);
}

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
	const { id, inStock } = body;

	const product = await prisma.product.update({
		where: { id },
		data: {
			inStock,
		},
	});

	return NextResponse.json(product);
}
