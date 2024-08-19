// export const dynamic = "force-dynamic";

import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } }
) {
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
	const product = await prisma.product.delete({
		where: { id: params.id },
	});

	return NextResponse.json(product);
}
