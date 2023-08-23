import { db } from "@/lib/db";

interface ArticlePageProps {
  params: {
    article: string;
  };
}

const ArticlePage: React.FC<ArticlePageProps> = async ({ params }) => {
  const article = await db.article.findUnique({
    where: { slug: params.article },
    include: { category: true, author: true, tags: true },
  });

  console.log("params:", params);

  if (!article) {
    return <div>Not found</div>;
  }

  return (
    <div>
      <div className="flex flex-col p-4 bg-slate-100">
        <div>{article.title}</div>
        <div>{article.category.slug}</div>
        <div>{article.slug}</div>
      </div>
    </div>
  );
};

export default ArticlePage;
