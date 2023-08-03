import { db } from "@/lib/db";
import CaseOrderForm from "../components/case-order-form";

const CaseOrderPage = async ({
  params,
}: {
  params: { caseOrderSlug: string };
}) => {
  const caseOrder = await db.caseOrder.findFirst({
    where: {
      slug: params.caseOrderSlug,
    },
  });

  const lawsuits = await db.case.findMany({
    orderBy: { label: "asc" },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <CaseOrderForm initialData={caseOrder} cases={lawsuits} />
      </div>
    </div>
  );
};

export default CaseOrderPage;
