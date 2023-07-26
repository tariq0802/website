import { db } from "@/lib/db";
import CaseOrdersClient from "./components/client";

const CaseOrdersPage = async () => {
  const caseOrders = await db.caseOrder.findMany({
    include: { case: true },
    orderBy: {
      label: "asc",
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <CaseOrdersClient data={caseOrders} />
      </div>
    </div>
  );
};

export default CaseOrdersPage;
