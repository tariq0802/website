import { db } from "@/lib/db";

interface CategoryPageProps {
  params: {
    categorySlug: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ params }) => {
  const category = await db.category.findUnique({
    where: { slug: params.categorySlug },
    include: { articles: true },
  });

  if (!category) {
    return <div>Category not found</div>;
  }

  const articles = category.articles;
  return (
    <div>
      {articles.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};

export default CategoryPage;
