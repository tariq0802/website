import { db } from "@/lib/db";
import TagsClient from "./components/client";

const TagsPage = async () => {
  const tags = await db.tag.findMany({
    orderBy: {
      label: "asc",
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <TagsClient data={tags} />
      </div>
    </div>
  );
};

export default TagsPage;
