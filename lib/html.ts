"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function saveGrape(components:any, page:string) {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }
    if (!session?.user.siteId) {
      return {
        error: "No site",
      };
    }
    
    let siteId = session?.user.siteId

    const siteData = await prisma.site.findFirst({
        where: {
            id: siteId
        }
    });

    let data = siteData?.siteData as any || {}

    if (data == null) data = {}

    data[page] = JSON.parse(JSON.stringify(components));

    await prisma.site.update({
        where: {
            id: siteId
        },
        data
    });

    // JSON.stringify(editor.getComponents());
      

}