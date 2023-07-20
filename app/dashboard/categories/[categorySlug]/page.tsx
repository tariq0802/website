import { db } from "@/lib/db";
import { CategoryForm } from "./components/category-form";

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

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} />
        
      </div>
    </div>
  );
};

export default CategoryPage;
