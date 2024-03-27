import { getPostsForSite } from "@/lib/fetchers";

export async function GET(req: Request, { params }: { params: { domain: string } }) {

    return Response.json(await getPostsForSite(params.domain))

}