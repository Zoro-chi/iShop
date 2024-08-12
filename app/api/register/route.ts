import bcrypt from "bcrypt";
import prisma from "../../../libs/prismaDb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const body = await req.json();
	const { name, email, password } = body;
	if (!name || !email || !password) throw new Error("Please fill all fields");
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await prisma.user.create({
		data: {
			name,
			email,
			hashedPassword,
		},
	});

	return NextResponse.json(user);
}
