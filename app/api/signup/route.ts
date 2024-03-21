import { lucia } from "@/lib/auth";
import { generateId } from "lucia";
import prisma from "@/lib/prisma";

import type { NextApiRequest } from "next";
import { Argon2id } from "oslo/password";

export async function POST(req: Request) {

    // return Response.json({ message: "string" })

	const data = await req.json();

	const displayName = data.displayName
	const email = data.email

	// const displayName = data.get('displayName')?.toString()
	// const email = data.get('email')?.toString()

	// console.log(displayName)
	// console.log(data)

	if (
		!email ||
		email.length < 3 ||
		!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
	) {
		return Response.json({
			error: "Invalid email"
		}, {
			status: 400
		})
	}

	// const password = data.get('password')?.toString()
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
	
	// TODO: check if username is already used
	const user = await prisma.user.create({
		data: { 
			id: userId,
			email: email,
			hashed_password: hashedPassword,
			displayName: displayName,
			emailVerified: null
		},
	})

	const session = await lucia.createSession(userId, {});
	return new Response("", {
		headers: {
			"Set-Cookie": lucia.createSessionCookie(session.id).serialize(),
		}
	})
}