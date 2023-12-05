import { Card } from "@tremor/react";
import articles from "../articles.json";

const SolutionsPage = () => {
  return (
    <>
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 py-20">
        <div className="container mx-auto flex flex-col items-center justify-center text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
            What does ReRoto Help With?
          </h1>
          <p className="mb-8 text-lg text-white md:text-xl">
            ReRoto has so many solutions with you, and if you aren&apos;t happy
            with your service, we make it as easy as possible to leave.
          </p>
          <a
            href="https://app.reroto.com"
            className="rounded-full bg-white px-6 py-2 text-lg text-primary-600 transition duration-300 ease-in-out hover:bg-primary-600 hover:text-white"
          >
            Get Started
          </a>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {articles.map((article, index) => (
              <div
                key={index}
                className="rounded-xl border shadow md:col-span-1"
              >
                <div className="overflow-hidden rounded-lg bg-white shadow-lg">
                  <img
                    className="h-64 w-full object-cover object-center"
                    src={article.image}
                    alt={article.title}
                  />
                  <div className="p-6">
                    <h2 className="mb-2 text-xl font-semibold">
                      {article.title}
                    </h2>
                    <p className="truncate leading-relaxed text-gray-600">
                      {article.content.split("\n")[0]}
                    </p>
                    <a
                      href={`/solutions/${article.slug}`}
                      className="mt-4 block font-semibold text-indigo-600 transition duration-300 hover:text-indigo-500"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SolutionsPage;
