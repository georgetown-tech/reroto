// @ts-nocheck
"use client";

import {
  Firefox,
  Chrome,
  Safari,
  InternetExplorer,
} from "@/components/icons/browsers";
import {
  Card,
  Text,
  Title,
  BarList,
  Flex,
  Grid,
  Bold,
  AreaChart,
} from "@tremor/react";
import Image from "next/image";
import { useState, useEffect } from "react";

const chartdata = [
  {
    date: "Jan 23",
    Visitors: 2890,
  },
  {
    date: "Feb 23",
    Visitors: 2756,
  },
  {
    date: "Mar 23",
    Visitors: 3322,
  },
  {
    date: "Apr 23",
    Visitors: 3470,
  },
  {
    date: "May 23",
    Visitors: 3475,
  },
  {
    date: "Jun 23",
    Visitors: 3129,
  },
];

const pages = [
  { name: "/platforms-starter-kit", value: 1230 },
  { name: "/vercel-is-now-bercel", value: 751 },
  { name: "/nextjs-conf", value: 471 },
  { name: "/150m-series-d", value: 280 },
  { name: "/about", value: 78 },
];

const referrers = [
  { name: "t.co", value: 453 },
  { name: "vercel.com", value: 351 },
  { name: "linkedin.com", value: 271 },
  { name: "google.com", value: 191 },
  {
    name: "news.ycombinator.com",
    value: 71,
  },
];

const countries = [
  { name: "United States of America", value: 789, code: "US" },
  { name: "India", value: 676, code: "IN" },
  { name: "Germany", value: 564, code: "DE" },
  { name: "United Kingdom", value: 234, code: "GB" },
  { name: "Spain", value: 191, code: "ES" },
];

const categories = [
  {
    title: "Top Pages",
    subtitle: "Page",
    data: pages,
  },
  {
    title: "Top Referrers",
    subtitle: "Source",
    data: referrers,
  },
  {
    title: "Countries",
    subtitle: "Country",
    data: countries,
  },
];

export default function AnalyticsMockup({ domain }: { domain: string }) {
  const [kpi, setKpi] = useState([]);
  const [browser, setBrowser] = useState([]);

  useEffect(() => {
    (async () => {
      const kpiReq = await fetch(
        `https://api.us-east.aws.tinybird.co/v0/pipes/kpis.json?token=p.eyJ1IjogImI0MTgwNzU2LTI1YzctNDNlMC04M2Q3LWQyN2ZhODA2NTk3YiIsICJpZCI6ICI5YmM4ODkxYy1mOTUwLTQ3MzEtODU5Ni0yNDViZjYwYTc2ODUiLCAiaG9zdCI6ICJ1cy1lYXN0LWF3cyJ9.FuRJxQ_c-4h5h0biIQ304lYPwnrWrP3U0m4SIWTjn5A&domain=${domain}`,
      );
      const kpiData = await kpiReq.json();

      const browserReq = await fetch(
        `https://api.us-east.aws.tinybird.co/v0/pipes/top_browsers.json?limit=50&token=p.eyJ1IjogImI0MTgwNzU2LTI1YzctNDNlMC04M2Q3LWQyN2ZhODA2NTk3YiIsICJpZCI6ICI5YmM4ODkxYy1mOTUwLTQ3MzEtODU5Ni0yNDViZjYwYTc2ODUiLCAiaG9zdCI6ICJ1cy1lYXN0LWF3cyJ9.FuRJxQ_c-4h5h0biIQ304lYPwnrWrP3U0m4SIWTjn5A&domain=${domain}`,
      );
      const browserData = await browserReq.json();

      setKpi(kpiData.data);
      setBrowser(browserData.data);
      console.log(browserData.data);
    })();
  }, [domain]);

  return (
    <div className="grid gap-6">
      <Card>
        <Title>Visitors</Title>
        <AreaChart
          className="mt-4 h-72"
          data={kpi}
          index="date"
          categories={["visits"]}
          colors={["indigo"]}
          valueFormatter={(number: number) =>
            Intl.NumberFormat("us").format(number).toString()
          }
        />
      </Card>
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        <Card key="browsers" className="max-w-lg">
          <Title>Top Browsers</Title>
          <Flex className="mt-4">
            <Text>
              <Bold>Browser</Bold>
            </Text>
            <Text>
              <Bold>Visitors</Bold>
            </Text>
          </Flex>
          <BarList
            // @ts-ignore
            data={browser.map(({ browser, hits, visits }) => ({
              name: browser[0].toUpperCase() + browser.slice(1).toLowerCase(),
              value: visits,
              icon: () => {
                if (browser == "firefox") {
                  return <Firefox className="mr-2.5" width="20" height="20" />;
                } else if (browser == "chrome") {
                  return <Chrome className="mr-2.5" width="20" height="20" />;
                } else if (browser == "opera") {
                } else if (browser == "ie") {
                  return <InternetExplorer className="mr-2.5" width="20" height="20" />
                } else if (browser == "safari") {
                  return <Safari className="mr-2.5" width="20" height="20" />;
                } else {
                }
              },
            }))}
            className="mt-2"
          />
        </Card>
        {categories.map(({ title, subtitle, data }) => (
          <Card key={title} className="max-w-lg">
            <Title>{title}</Title>
            <Flex className="mt-4">
              <Text>
                <Bold>{subtitle}</Bold>
              </Text>
              <Text>
                <Bold>Visitors</Bold>
              </Text>
            </Flex>
            <BarList
              // @ts-ignore
              data={data.map(({ name, value, code }) => ({
                name,
                value,
                icon: () => {
                  if (title === "Top Referrers") {
                    return (
                      <Image
                        src={`https://www.google.com/s2/favicons?sz=64&domain_url=${name}`}
                        alt={name}
                        className="mr-2.5"
                        width={20}
                        height={20}
                      />
                    );
                  } else if (title === "Countries") {
                    return (
                      <Image
                        src={`https://flag.vercel.app/m/${code}.svg`}
                        className="mr-2.5"
                        alt={code}
                        width={24}
                        height={16}
                      />
                    );
                  } else {
                    return null;
                  }
                },
              }))}
              className="mt-2"
            />
          </Card>
        ))}
      </Grid>
    </div>
  );
}
