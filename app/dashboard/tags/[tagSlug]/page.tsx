import { db } from "@/lib/db";
import TagForm from "../components/tag-form";

const TagPage = async ({ params }: { params: { tagSlug: string } }) => {
  const tag = await db.tag.findFirst({
    where: {
      slug: params.tagSlug,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TagForm initialData={tag} />
      </div>
    </div>
  );
};

export default TagPage;
