import { db } from "@/lib/db";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ params }) => {
  const parent = await db.category.findUnique({
    where: { slug: params.category },
  });

  console.log("params:", params);

  if (!parent) {
    return <div>Not found</div>;
  }

  const children = await db.category.findMany({
    where: { parentId: parent.id },
  });

  const categoryIds = [parent.id, ...children.map((child) => child.id)];

  const articles = await db.article.findMany({
    where: { categoryId: { in: categoryIds } },
    include: {
      author: { select: { name: true } },
      category: { select: { label: true, slug: true } },
    },
    take: 20,
  });

  return (
    <div>
      {articles.map((item) => (
        <div key={item.id} className="flex flex-col p-4 bg-slate-100">
          <div>{item.title}</div>
          <div>{item.category.slug}</div>
          <div>{item.slug}</div>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
