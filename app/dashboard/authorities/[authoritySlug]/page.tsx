import { db } from "@/lib/db";
import AuthorityForm from "../components/authority-form";

const AuthorityPage = async ({ params }: { params: { authoritySlug: string } }) => {
  const authority = await db.recruitmentBoard.findFirst({
    where: {
      slug: params.authoritySlug,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <AuthorityForm initialData={authority} />
      </div>
    </div>
  );
};

export default AuthorityPage;
