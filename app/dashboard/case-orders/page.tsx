import { db } from "@/lib/db";

const CaseCategoriesPage = async () => {
  const caseOrders = await db.caseOrder.findMany({
    orderBy: {
      label: "asc",
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        {/* <CaseCategoriesClient data={caseCategories} /> */}
      </div>
    </div>
  );
};

export default CaseCategoriesPage;
