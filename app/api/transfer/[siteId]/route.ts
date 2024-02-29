import {
    getConfigResponse,
    getDomainResponse,
    verifyDomain,
} from "@/lib/domains";
import { DomainVerificationStatusProps } from "@/lib/types";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"
import { TransferObject } from "@/lib/types";
import { Prisma } from "@prisma/client";

export async function POST(
    _req: Request,
    { params }: { params: { siteId: string } },
) {
    let siteId = params.siteId
    let transfer:TransferObject = await _req.json();

    // console.log(transfer)

    let temp = [
    ].map(i => {

      return i.text

    }).join('; ') + ";"
    
  console.log(temp)

  try {

    await prisma.$executeRaw`UPDATE "Site" SET "name" = ${transfer.name}, "description" = ${transfer.description}, "logo" = ${transfer.logo}, "image" = ${transfer.banner}, "customDomain" = ${transfer.domain} WHERE "id"=${siteId}`;

    await prisma.post.createMany({
      data: transfer.articles
    })

    return NextResponse.json({ success: true });

  } catch (e) {

    console.log(e)

    return NextResponse.json({ success: false });

  }
  
}
