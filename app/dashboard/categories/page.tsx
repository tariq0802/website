import { db } from "@/lib/db";
import CategoriesClient from "./components/client";

const CategoriesPage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      label: "asc",
    },
    include: { parent: true },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <CategoriesClient data={categories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
