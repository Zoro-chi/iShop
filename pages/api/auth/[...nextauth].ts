import NextAuth, { AuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";

import prisma from "../../../libs/prismaDb";

// Define the NextAuth options with the correct type for session strategy
export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password)
					throw new Error("Invalid Email or Password");

				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});

				if (!user || !user?.hashedPassword)
					throw new Error("Invalid Email or Password");

				const isValidPassword = await bcrypt.compare(
					credentials.password,
					user.hashedPassword
				);

				if (!isValidPassword) throw new Error("Invalid Email or Password");

				return user;
			},
		}),
	],
	pages: {
		signIn: "/login",
	},
	debug: process.env.NODE_ENV === "development",
	session: {
		strategy: "jwt", // Explicitly setting the strategy to "jwt"
	},
	secret: process.env.NEXTAUTH_SECRET,
};

// Export the default NextAuth configuration
export default NextAuth(authOptions);

// Export specific handlers
export const handlers = {
	auth: (req: NextApiRequest, res: NextApiResponse) =>
		NextAuth(req, res, authOptions),
	signIn: async (req: NextApiRequest, res: NextApiResponse) => {
		const session = await getServerSession(req, res, authOptions);
		if (session) {
			// Handle already signed-in user
			res.redirect("/dashboard");
		} else {
			// Handle sign-in logic
			return NextAuth(req, res, authOptions);
		}
	},
	signOut: async (req: NextApiRequest, res: NextApiResponse) => {
		const session = await getServerSession(req, res, authOptions);
		if (session) {
			// Handle sign-out logic
			res.redirect("/goodbye");
		} else {
			res.status(401).json({ error: "Not authenticated" });
		}
	},
};
