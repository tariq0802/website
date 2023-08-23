import BigCard from "@/components/big-card";
import SimpleCard from "@/components/simple-card";
import SmallCard from "@/components/small-card";
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ params }) => {
  const parent = await db.category.findUnique({
    where: { slug: params.category },
  });

  if (!parent) {
    return <div>Not found</div>;
  }

  const children = await db.category.findMany({
    where: { parentId: parent.id },
  });

  const categoryIds = [parent.id, ...children.map((child) => child.id)];

  const articles = await db.article.findMany({
    where: { categoryId: { in: categoryIds } },
    orderBy: { createdAt: "desc" },
    include: {
      category: {
        select: {
          label: true,
          slug: true,
          parent: {
            select: {
              label: true,
              slug: true,
            },
          },
        },
      },
      author: { select: { name: true } },
    },
    take: 50,
  });

  return (
    <>
      <div className="bg-gray-200 h-60 mb-8 w-full relative">
        <Image
          src={parent.image || "/images/placeholder.jpg"}
          alt="Photo"
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="absolute left-20 top-20">
          <h3 className=" text-white bn text-3xl font-bold">
            {parent.label}
          </h3>
          <p className="text-white text-lg opacity-70">{parent.description}</p>
        </div>
      </div>
      <div className="flex flex-col md:grid grid-cols-3 gap-6 gap-y-10">
        <div className="md:col-span-2">
          <BigCard data={articles.slice(0, 1)} />
          <SmallCard data={articles.slice(1, 5)} />
          <SimpleCard data={articles.slice(5)} />
        </div>
        <div className="md:col-span-1 bg-slate-50 min-h-[100vh]">
          <div className="flex bg-slate-700 px-3 pt-1">
            <Link href={`/`}>
              <h2 className="bn text-lg font-bold text-white">আর্কাইভ</h2>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
