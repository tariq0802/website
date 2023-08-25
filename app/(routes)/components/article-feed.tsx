"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import axios from "axios";
import { FeedArticle } from "@/types/article";
import { Loader2 } from "lucide-react";
import Card from "./card";

interface ArticleFeedProps {
  initialArticles: FeedArticle[];
  category: string;
}

const ArticleFeed: React.FC<ArticleFeedProps> = ({
  initialArticles,
  category,
}) => {
  const lastArticleRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastArticleRef.current,
    threshold: 1,
  });
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-query"],
    async ({ pageParam = 1 }) => {
      const query =
        `/api/articles?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}` +
        (!!category ? `&category=${category}` : "");
      const { data } = await axios.get(query);
      return data;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialArticles], pageParams: [1] },
    }
  );

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const articles = data?.pages.flatMap((page) => page) ?? initialArticles;

  return (
    <>
      <div className="flex flex-col md:grid grid-cols-3 gap-6 gap-y-10">
        <div className="md:col-span-2">
          {articles &&
            articles.map((article, index) => {
              if (index === articles.length - 1) {
                return (
                  <div key={article.id} ref={ref}>
                    <Card article={article} />
                  </div>
                );
              } else {
                return <Card key={index} article={article} />;
              }
            })}
          {isFetchingNextPage && (
            <div className="flex justify-center">
              <Loader2 className="w-6 h-6 text-zinc-500 animate-spin" />
            </div>
          )}
        </div>
        <div className="md:col-span-1 bg-slate-50 min-h-[100vh]">
          <div className="flex bg-slate-700 px-3 pt-1">
            <Link href={`/`}>
              <h2 className="bn text-lg font-bold text-white">আর্কাইভ</h2>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default ArticleFeed;
