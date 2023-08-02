import { db } from "@/lib/db";
import ArticlesClient from "./components/client";

const ArticlesPage = async () => {
  const articles = await db.article.findMany({
    include: { category: true, author: true, tags: true},
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <ArticlesClient data={articles} />
      </div>
    </div>
  );
};

export default ArticlesPage;
