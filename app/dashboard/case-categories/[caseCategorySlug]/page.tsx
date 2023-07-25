import { db } from "@/lib/db";
import CaseCategoryForm from "../components/case-category-form";

const CaseCategoryPage = async ({ params }: { params: { caseCategorySlug: string } }) => {
  const caseCategory = await db.caseCategory.findFirst({
    where: {
      slug: params.caseCategorySlug,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CaseCategoryForm initialData={caseCategory} />
      </div>
    </div>
  );
};

export default CaseCategoryPage;
