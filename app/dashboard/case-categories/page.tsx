import { db } from "@/lib/db";
import CaseCategoriesClient from "./components/client";

const CaseCategoriesPage = async () => {
  const caseCategories = await db.caseCategory.findMany({
    orderBy: {
      label: "asc",
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <CaseCategoriesClient data={caseCategories} />
      </div>
    </div>
  );
};

export default CaseCategoriesPage;
