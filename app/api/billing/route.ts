import {
    getConfigResponse,
    getDomainResponse,
    verifyDomain,
} from "@/lib/domains";
import { DomainVerificationStatusProps } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET(
    _req: Request,
    { params }: { params: { slug: string } },
) {

    return NextResponse.json({});

}
  