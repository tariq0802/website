import { db } from "@/lib/db";
import RecruitmentsClient from "./components/client";

const RecruitmentsPage = async () => {
  const recruitments = await db.recruitment.findMany({
    include: { recruitmentBoard: true },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <RecruitmentsClient data={recruitments} />
      </div>
    </div>
  );
};

export default RecruitmentsPage;
