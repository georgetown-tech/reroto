import {
    getConfigResponse,
    getDomainResponse,
    verifyDomain,
} from "@/lib/domains";
import { DomainVerificationStatusProps } from "@/lib/types";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Plan } from "@prisma/client";

const stripe = require('stripe')(process.env.STRIPE_KEY);

export async function GET(
    _req: Request,
    { params }: { params: { slug: string } },
) {

    const sites = await prisma.site.findMany({
        where: {
            stripeId: { not: null },
            plan: { not: Plan.none }
        },
        select: {
            name: true,
            description: true,
            createdAt: true,
            stripeId: true,
            plan: true,
            siteData: false,
        },
    })

    return NextResponse.json(sites);

}
  