"use client";

import prisma from "@/lib/prisma";
import Form from "@/components/form";
import { updateSite } from "@/lib/actions";
import { getSession } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";
import { NodeHtmlMarkdown, NodeHtmlMarkdownOptions } from "node-html-markdown";
import {
  findWebsiteHost,
  downloadWordpress,
  downloadWordpressArticleSegment,
  objectToQuery,
} from "@/lib/transfer";
import { toast } from "sonner";
import router from "next/router";
import React from "react";

export default function TransferForm({ siteId }: { siteId: string }) {
  const [step, setStep] = React.useState("start");
  const [host, setHost] = React.useState("");
  const [articles, setArticles] = React.useState<any[]>([]);
  const [articleCount, setArticleCount] = React.useState(0);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [transfer, setTransfer] = React.useState("");

  const [time, setTime] = React.useState(Date.now());

  React.useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (step == "start")
    return (
      <form
        action={async (formData: FormData) =>
          findWebsiteHost(formData)
            .then((res: any) => {
              if (res.error) {
                toast.error(res.error);
              } else {
                // va.track("Uploaded Media");
                const { host: _host } = res;
                // modal?.hide();
                // router.refresh();
                // router.push(`/`);
                setHost(_host);
                setStep("download");
                toast.success(`Host identified as ${_host}.`);
              }

              return res;
            })
            .then(async (params: { domain: string; host: string }) => {
              if (params.host == "SNWorks")
                return { error: "SNWorks not supported." };
              if (params.host == "SNO Sites") {
                let start = await downloadWordpress(params);
                let page = 1;
                let _articles = [];

                setName(start.name);
                setDescription(start.description);

                // setArticleCount(start.articleCount);

                // while (page * 100 - 100 < start.articleCount) {
                //   let articleSegment = await downloadWordpressArticleSegment({
                //     ...params,
                //     page,
                //   });

                //   _articles.push(...articleSegment);

                //   page++;
                //   setArticles(_articles);
                // }

                // console.log(_articles);
              }
              if (params.host == "Squarespace")
                return { error: "Squarespace not supported." };
              return { error: "Unknown hosts not supported." };
            })
        }
        className="flex h-full w-full items-center justify-center p-8"
      >
        <div className="w-full max-w-lg rounded-lg border bg-white p-4 py-8 shadow">
          <h2 className="w-full text-center font-cal text-2xl font-bold">
            Web Transfer
          </h2>
          <p className="mt-2">
            Enter the url of the website homepage and we will transfer its
            content. Please note, this process can take anywhere from a few
            minutes to several hours.
          </p>
          <input
            className="mt-4 w-full rounded-lg border shadow"
            name="domain"
            id="domain"
            type="text"
            placeholder="https://news.gtowntech.org"
          />
          <input
            className="transition-bg mt-4 w-full rounded-lg bg-primary-500 p-2 font-bold text-white shadow duration-300 hover:cursor-pointer hover:bg-primary-600 active:bg-primary-700"
            type="submit"
            value="Transfer"
          />
        </div>
      </form>
    );

  if (step == "download")
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <div className="w-full max-w-lg rounded-lg border bg-white p-4 py-8 shadow">
          <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="transition-width h-2.5 rounded-full bg-primary-500 duration-300"
              style={{
                width: `${(100 * articles.length) / articleCount}%`,
              }}
            ></div>
          </div>
          <div className="flex aspect-square w-full flex-col items-center justify-center gap-4">
            <span className="text-center text-3xl font-bold">
              {/* {articles.length} / {articleCount} */}
              {name}
            </span>
            <span className="w-2/3 text-center text-xl text-slate-500">
              {/* Downloading Articles... */}
              {description}
            </span>
            <div />
            <span className="w-2/3 text-center text-xl text-slate-500">
              {articles.length} / {articleCount}
            </span>
          </div>
          <ol className="flex w-full items-center px-4 text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
            <li className="after:border-1 flex items-center text-primary-500 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-blue-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
              <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                Search
              </span>
            </li>
            <li className="after:border-1 flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 after:content-[''] dark:after:border-gray-700 sm:after:inline-block md:w-full xl:after:mx-10">
              <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                Download
              </span>
            </li>
            <li className="flex items-center">Transfer</li>
          </ol>
          {articles.length == articleCount ? (
            <button
              onClick={async () => {
                setStep("transfer");

                const transferString = await objectToQuery(
                  {
                    name,
                    description,
                    colors: [],
                    logo: "",
                    domain: "",
                    articles,
                  },
                  siteId,
                );
                setTransfer(transferString);
              }}
              className="mt-8 w-full rounded-xl border bg-primary p-4 font-cal text-xl font-black text-white shadow hover:bg-primary-600 active:bg-primary-700"
            >
              Finish Transfer
            </button>
          ) : (
            <button
              onClick={() => {
                router.reload();
              }}
              className="mt-8 w-full rounded-xl border bg-white p-4 font-cal text-xl font-black shadow hover:bg-gray-50 active:bg-gray-100"
            >
              Cancel Transfer
            </button>
          )}
        </div>
      </div>
    );

  if (step == "transfer")
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <div className="w-full max-w-lg overflow-scroll rounded-lg border bg-white p-4 py-8 shadow">
          <pre>{transfer}</pre>
        </div>
      </div>
    );

  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="w-full max-w-lg rounded-lg border bg-white p-4 py-8 shadow">
        Successfully Transferred
      </div>
    </div>
  );
}
