import { db } from "@/lib/db";
import UsersClient from "./components/client";

const CategoriesPage = async () => {
  const users = await db.user.findMany({
    orderBy: {
      role: "asc",
    },
    include: {
      accounts: true,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <UsersClient data={users as any} />
      </div>
    </div>
  );
};

export default CategoriesPage;
