"use server"

import { parse } from 'node-html-parser';

function htmlToMarkdown(htmlElement:any):string {

    if (htmlElement._rawText != undefined) return htmlElement._rawText

    if (htmlElement.parentNode == null) {

        return htmlElement.childNodes.map((i:any) => {

            return htmlToMarkdown(i)

        }).join('\n\n')

    }

    if (htmlElement.rawTagName == 'p') {

        return htmlElement.childNodes.map((i:any) => {

            return htmlToMarkdown(i)

        }).join('')

    }

    if (htmlElement.rawTagName == 'b' || htmlElement.rawTagName == "strong") {

        return "**" + htmlElement.childNodes.map((i:any) => {

            return htmlToMarkdown(i)

        }).join('') + "**"

    }

    if (htmlElement.rawTagName == 'i' || htmlElement.rawTagName == 'em') {

        return "*" + htmlElement.childNodes.map((i:any) => {

            return htmlToMarkdown(i)

        }).join('') + "*"

    }

    if (htmlElement.rawTagName == 'a') {

        return "[" + htmlElement.childNodes.map((i:any) => {

            return htmlToMarkdown(i)

        }).join('') + "]" + `(${htmlElement.attributes['href'] || ""})`

    }

    if (htmlElement.rawTagName == 'img') {

        return `![${htmlElement.attributes['alt'] || htmlElement.childNodes.map((i:any) => {

            return htmlToMarkdown(i)

        }).join('')}](${htmlElement.attributes['src'] || ""})`

    }

    if (htmlElement.rawTagName == 'blockquote') {

        return `> ${htmlElement.childNodes.map((i:any) => {

            return htmlToMarkdown(i)

        }).join('')}`

    }

    if (htmlElement.rawTagName == 'h1') {

        return `# ${htmlElement.childNodes.map((i:any) => {

            return htmlToMarkdown(i)

        }).join('')}`

    }

    if (htmlElement.rawTagName == 'h2') {

        return `## ${htmlElement.childNodes.map((i:any) => {

            return htmlToMarkdown(i)

        }).join('')}`

    }

    if (htmlElement.rawTagName == 'h3') {

        return `### ${htmlElement.childNodes.map((i:any) => {

            return htmlToMarkdown(i)

        }).join('')}`

    }

    if (htmlElement.rawTagName == 'h4') {

        return `#### ${htmlElement.childNodes.map((i:any) => {

            return htmlToMarkdown(i)

        }).join('')}`

    }

    if (htmlElement.rawTagName == 'h5') {

        return `##### ${htmlElement.childNodes.map((i:any) => {

            return htmlToMarkdown(i)

        }).join('')}`

    }

    if (htmlElement.rawTagName == 'h6') {

        return `###### ${htmlElement.childNodes.map((i:any) => {

            return htmlToMarkdown(i)

        }).join('')}`

    }

    if (htmlElement.rawTagName == 'u') {

        return `__${htmlElement.childNodes.map((i:any) => {

            return htmlToMarkdown(i)

        }).join('')}__`

    }

    if (htmlElement.rawTagName == 'br' || htmlElement.rawTagName == 'span' || htmlElement.rawTagName == 'div') {

        return `${htmlElement.childNodes.map((i:any) => {

            return htmlToMarkdown(i)

        }).join('')}`

    }

    if (htmlElement.rawTagName == 'figure') {

        let figCaption = htmlElement.querySelector('figcaption')
        let img = htmlElement.querySelector('img')
        
        if (img == null) return ``
        if (figCaption == null) return `![This photo has no caption.](${img.attributes['src'] || ""})`

        return `![${figCaption.childNodes.map((i:any) => {

            return htmlToMarkdown(i)

        }).join('')}](${img.attributes['src'] || ""})`

    }

    if (htmlElement.rawTagName == 'ol') {

        return htmlElement.childNodes.map((i:any) => {

            if (i.rawTagName == 'li') return `1. ${i.childNodes.map((j:any) => { return htmlToMarkdown(j) })}`
            return htmlToMarkdown(i)

        }).join('\n')

    }

    if (htmlElement.rawTagName == 'ul') {

        return htmlElement.childNodes.map((i:any) => {

            if (i.rawTagName == 'li') return `- ${i.childNodes.map((j:any) => { return htmlToMarkdown(j) })}`
            return htmlToMarkdown(i)

        }).join('\n')

    }

    return htmlElement.toString()

}

function getMarkdown(item:{rendered:string}):string {

    let dom = parse(item.rendered || "")

    return htmlToMarkdown(dom).trim()

}

export async function downloadWordpress(params: { domain:string; host:string; }) {

    const metadataReq = await fetch(`${params.domain}/wp-json/`)
    const metadataData = await metadataReq.json()

    const name = metadataData.name
    const description = metadataData.description
    const domain = new URL(metadataData.url || metadataData.home).hostname

    let page = 1
    let tapReq = await fetch(`${params.domain}/wp-json/wp/v2/posts?per_page=100&page=${page}`)
    let articleCount = parseInt(tapReq.headers.get('X-Wp-Total') || "0")
    
    return {
        name,
        description,
        domain,
        articleCount
    }

}

export async function downloadWordpressArticleSegment(params: { domain:string; host:string; page:number; }) {

    let tapReq = await fetch(`${params.domain}/wp-json/wp/v2/posts?per_page=100&page=${params.page}`)
    let tapData = await tapReq.json()

    // console.log(tapData[0].id)

    return tapData.map((i:any) => {

        return {
            title: getMarkdown(i.title),
            description: getMarkdown(i.excerpt),
            content: getMarkdown(i.content),
            slug: i.slug,
            createdAt: new Date(i.date),
            updatedAt: new Date(i.modified),
            image: "",
            imageBlurhash: "",
            published: true,
        }

    })

}

export async function findWebsiteHost(formData:FormData) {

    let domain:string = formData.get("domain")?.toString() || "";
    let url = new URL(domain)

    try {

        const baseReq = await fetch(`https://${url.hostname}/`, {
            mode: 'no-cors'
        })
        const baseText = await baseReq.text()

        let hostParts = url.hostname.split('.')
        let rootDomain = hostParts.slice(hostParts.length - 2, hostParts.length).join('.')

        const metaReq = await fetch(`https://api.microlink.io/?url=${encodeURI(`https://${rootDomain}`)}&palette=true&audio=false&video=false&iframe=false`)
        const metadata = await metaReq.json()

        if (baseText.includes("http://snosites.com")) {

            return {
                ...metadata,
                host: "SNO Sites",
                domain: `https://${url.hostname}`
            }

        }

        if (baseText.includes("http://getsnworks.com")) {

            return {
                ...metadata,
                host: "SNWorks",
                domain: `https://${url.hostname}`
            }

        }

        return {
            ...metadata,
            host: "Unknown",
            domain: `https://${url.hostname}`
        }

    } catch (error:any) {

        return {
            error: error.message
        }

    }


}