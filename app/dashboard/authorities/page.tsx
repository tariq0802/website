import { db } from "@/lib/db";
import AuthorityClient from "./components/client";

const AuthoritiesPage = async () => {
  const authorities = await db.recruitmentBoard.findMany({
    orderBy: {
      label: "asc",
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <AuthorityClient data={authorities} />
      </div>
    </div>
  );
};

export default AuthoritiesPage;
