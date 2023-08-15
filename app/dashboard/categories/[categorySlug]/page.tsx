import { db } from "@/lib/db";
import { CategoryForm } from "../components/category-form";

const CategoryPage = async ({
  params,
}: {
  params: { categorySlug: string };
}) => {
  const category = await db.category.findFirst({
    where: {
      slug: params.categorySlug,
    },
  });

  const parents = await db.category.findMany({
    where: {
      parentId: null,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4">
        <CategoryForm initialData={category} parents={parents} />
      </div>
    </div>
  );
};

export default CategoryPage;
