import { db } from "@/lib/db";
import CaseForm from "../components/case-form";

const CasePage = async ({ params }: { params: { caseSlug: string } }) => {
  const data = await db.case.findFirst({
    where: { slug: params.caseSlug },
  });
  const caseCategories = await db.caseCategory.findMany({
    orderBy: { label: "asc" },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <CaseForm initialData={data} caseCategories={caseCategories} />
      </div>
    </div>
  );
};

export default CasePage;
