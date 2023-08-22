import { db } from "@/lib/db";

interface ParentPageProps {
  params: {
    parentSlug: string;
  };
}

const ParentPage: React.FC<ParentPageProps> = async ({ params }) => {
  const parentCategory = await db.category.findUnique({
    where: { slug: params.parentSlug },
    include: { children: { include: { articles: true } } },
  });

  if (!parentCategory) {
    return <div>Parent Category not found</div>;
  }

  const articles = parentCategory.children.flatMap((child) => child.articles);
  return (
    <div>
      {articles.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};

export default ParentPage;
