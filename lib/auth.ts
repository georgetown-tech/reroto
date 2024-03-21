import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";
import type { Session, User } from "lucia";
import type { IncomingMessage, ServerResponse } from "http";
import { cookies } from "next/headers";
import { cache } from "react";
import { ActionResult } from "next/dist/server/app-render/types";
import { redirect } from "next/navigation";

const adapter = new PrismaAdapter(prisma.session, prisma.user);
 
export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: process.env.NODE_ENV === "production"
		} 
	},
	getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			displayName: attributes.displayName,
			email: attributes.email,
			image: attributes.image,
			siteId: attributes.siteId,
			role: attributes.role
		};
	}
});

export function withSiteAuth(action: any) {
	return async (
	  formData: FormData | null,
	  siteId: string,
	  key: string | null,
	) => {
	  const { user } = await validateRequest();
	  if (!user) {
		return {
		  error: "Not authenticated",
		};
	  }
	  const site = await prisma.site.findUnique({
		where: {
		  id: siteId,
		},
	  });
	  if (!site || site.id !== user.siteId) {
		return {
		  error: "Not authorized",
		};
	  }
  
	  return action(formData, site, key);
	};
  }
  
  export function withPostAuth(action: any) {
	return async (
	  formData: FormData | null,
	  postId: string,
	  key: string | null,
	) => {
	  const { user } = await validateRequest();
	  if (!user) {
		return {
		  error: "Not authenticated",
		};
	  }
	  const post = await prisma.post.findUnique({
		where: {
		  id: postId,
		},
		include: {
		  site: true,
		},
	  });
	  if (!post || post.userId !== user.id) {
		return {
		  error: "Post not found",
		};
	  }
  
	  return action(formData, post, key);
	};
  }

export async function logout(): Promise<ActionResult> {
  "use server";
  
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/login");
}

export const validateRequest = cache(
	async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
		if (!sessionId) {
			return {
				user: null,
				session: null
			};
		}

		const result = await lucia.validateSession(sessionId);
		// next.js throws when you attempt to set cookie when rendering page
		try {
			if (result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
		} catch {}
		return result;
	}
);


declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	displayName: string;
    email: string;
	image: string;
	siteId: string;
	role: number;
}