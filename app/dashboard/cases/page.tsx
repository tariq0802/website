import { db } from "@/lib/db";
import CasesClient from "./components/client";

const CasePage = async () => {
  const cases = await db.case.findMany({
    orderBy: {
      title: "asc",
    },
    include: { caseCategory: true },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <CasesClient data={cases} />
      </div>
    </div>
  );
};

export default CasePage;
