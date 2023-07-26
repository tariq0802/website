import { db } from "@/lib/db";
import RecruitmentForm from "../components/article-form";

const ArticlePage = async ({ params }: { params: { articleSlug: string } }) => {
  const article = await db.article.findFirst({
    where: {
      slug: params.articleSlug,
    },
  });

  const categories = await db.category.findMany({
    orderBy: { label: "asc" },
  });
  const cases = await db.case.findMany({
    orderBy: { label: "asc" },
  });
  const recruitments = await db.recruitment.findMany({
    orderBy: { label: "asc" },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <RecruitmentForm
          initialData={article}
          categories={categories}
          cases={cases}
          recruitments={recruitments}
        />
      </div>
    </div>
  );
};

export default ArticlePage;
