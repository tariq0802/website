import { Article } from "@prisma/client";

export type FeedArticle = Article & {
  category: { slug: string; label: string } & {
    parent: { slug: string; label: string } | null;
  };
  author: { name: string | null };
};
