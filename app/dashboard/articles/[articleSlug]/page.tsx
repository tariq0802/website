import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import ArticleForm from "../components/article-form";

const ArticlePage = async ({ params }: { params: { articleSlug: string } }) => {
  const session = await getAuthSession();
  const article = await db.article.findFirst({
    where: {
      slug: params.articleSlug,
    },
    include: { tags: true },
  });

  const categories = await db.category.findMany({
    orderBy: { label: "asc" },
  });
  const cases = await db.case.findMany({
    orderBy: { label: "asc" },
  });
  const tags = await db.tag.findMany({
    orderBy: { label: "asc" },
  });
  const recruitments = await db.recruitment.findMany({
    orderBy: { label: "asc" },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <ArticleForm
          initialData={article}
          categories={categories}
          cases={cases}
          recruitments={recruitments}
          tags={tags}
          session={session}
        />
      </div>
    </div>
  );
};

export default ArticlePage;
