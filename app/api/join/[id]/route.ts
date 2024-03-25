import { lucia } from "@/lib/auth";
import { generateId } from "lucia";
import prisma from "@/lib/prisma";

import type { NextApiRequest } from "next";
import { Argon2id } from "oslo/password";

export async function POST(req: Request, { params }: { params: { id: string } }) {

	const data = await req.json();

	const displayName = data.displayName
	
	const password = data.password
	if (!password || password.length < 6 || password.length > 64) {
		return Response.json({
			error: "Invalid password"
		}, {
			status: 400
		})
	}

	const hashedPassword = await new Argon2id().hash(password);
	const userId = generateId(15);

	const invite = await prisma.invite.findUnique({
		where: {
			id: params.id
		}
	})
	
	if (invite == null) {

		return Response.json({
			error: "Invite does not exist"
		}, {
			status: 404
		})

	}
	
	// TODO: check if username is already used
	const user = await prisma.user.create({
		data: { 
			id: userId,
			email: invite.email,
			hashed_password: hashedPassword,
			displayName: displayName,
			emailVerified: new Date(),
			siteId: invite.siteId,
			role: invite.role
		},
	})

	await prisma.invite.delete({
		where: {
			id: params.id
		}
	})

	const session = await lucia.createSession(userId, {});
	return new Response("", {
		headers: {
			"Set-Cookie": lucia.createSessionCookie(session.id).serialize(),
		}
	})
}