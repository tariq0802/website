import { db } from "@/lib/db";
import RecruitmentForm from "../components/recruitment-form";

const RecruitmentPage = async ({
  params,
}: {
  params: { recruitmentSlug: string };
}) => {
  const recruitment = await db.recruitment.findFirst({
    where: {
      slug: params.recruitmentSlug,
    },
  });

  const authorities = await db.recruitmentBoard.findMany({
    orderBy: { label: "asc" },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <RecruitmentForm initialData={recruitment} authorities={authorities} />
      </div>
    </div>
  );
};

export default RecruitmentPage;
