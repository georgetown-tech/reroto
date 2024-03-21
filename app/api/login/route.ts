import { Argon2id } from "oslo/password";
import { lucia } from "@/lib/auth";

import type { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: Request) {
	const data = await req.json();
	const email = data?.email;
	if (
		!email ||
		email.length < 3 ||
		!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
	) {
        return Response.json({
            error: "Invalid email"
        }, { status: 400 })
	}
	const password = data?.password;
	if (!password || password.length < 6 || password.length > 255) {
        return Response.json({
            error: "Invalid password"
        }, { status: 400 })
	}

	const existingUser = await prisma?.user.findFirst({
        where: {
            email: email.toLowerCase().toString()
        }
    })
	if (!existingUser) {
        // Hash in order to stop timing attacks
        await new Argon2id().hash(password)

        return Response.json({
            error: "Incorrect username or password"
        }, { status: 400 })
	}

	const validPassword = await new Argon2id().verify(existingUser.hashed_password || "", password);
	if (!validPassword) {
        return Response.json({
            error: "Incorrect username or password"
        }, { status: 400 })
	}

	const session = await lucia.createSession(existingUser.id, {});
	return new Response("", {
		headers: {
			"Set-Cookie": lucia.createSessionCookie(session.id).serialize(),
		}
	})
}