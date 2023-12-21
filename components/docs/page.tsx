import * as React from "react";

import Image from 'next/image'
import { MDXRemote, compileMDX, MDXRemoteSerializeResult } from 'next-mdx-remote/rsc'
import { serialize } from 'next-mdx-remote/serialize'

export default async function DocsPage({ sections, source }: { sections: Array<{ name: string; content: Array<{ name: string; slug:string; }> }>; source: string }) {

    let h2Count = 1;
    let h3Count = 0;

  const h3Headers = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", ]

    const parsed = await compileMDX({ source, options: { parseFrontmatter: true }, components: {
        "h2": ({ children }) => <h2 className="mt-8 font-bold text-2xl">{(h3Count = 0) + h2Count++}. {children}</h2>,
        "h3": ({ children }) => <h3 className="mt-8 font-medium underline text-xl text-slate-600">{h3Headers[h3Count++]}. {children}</h3>,
        "p": ({ children }) => <p className="mt-2 text-lg">{children}</p>,
        "img": ({ alt, src }) => <img className="w-full rounded-xl bg-slate-50" src={src || ""} alt={alt || ""} />,
        "a": ({ href, children }) => <a className="underline text-sky-500" href={href}>{children}</a>
    } })

  return (
    <div className="mx-auto flex flex-row w-full max-w-[1480px] min-h-screen"
    // suppressHydrationWarning={true}
    >
      <div className="w-1/4 bg-gray-50 m-2 px-12 py-4 rounded-lg flex flex-col">
        {
          sections.map((i, n) => {

            return <div key={n} className="flex flex-col py-4">
              <span className="font-bold text-md py-4 font-cal">{i.name}</span>
              {
                i.content.map((j, m) => {

                  return <a className="border-l-2 pl-4 p-2 text-sm text-gray-500" key={m} href={j.slug}>{j.name}</a>

                })
              }
            </div>

          })
        }
      </div>
      <div className="w-1/2 p-12">
        <span className="text-lg font-md font-cal text-primary">{parsed.frontmatter['category'] as string}</span>
        <h1 className="text-4xl font-md font-title mb-8">{parsed.frontmatter['title'] as string}</h1>
        <p className="text-slate-500">{parsed.frontmatter['description'] as string}</p>
        <hr className="my-12" />
        {/* @ts-ignore */}
        {parsed.content}
      </div>
      <div className="w-1/4 p-4">
        
      </div>
    </div>
  );

}