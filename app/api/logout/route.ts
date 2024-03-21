import { lucia, validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function GET(req: Request) {
	const { session } = await validateRequest();
	if (!session) {
		return Response.json({
            error: "Unauthorized"
        }, { status: 400 })
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/login");
}