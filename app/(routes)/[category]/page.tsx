import { db } from "@/lib/db";
import Image from "next/image";
import ArticleFeed from "../components/article-feed";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ params }) => {
  const category = await db.category.findUnique({
    where: { slug: params.category },
    include: {
      articles: {
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
        take: INFINITE_SCROLL_PAGINATION_RESULTS,
      },
    },
  });

  if (!category) {
    return notFound();
  }

  return (
    <>
      <div className="bg-gray-200 h-44 md:h-60 mb-8 w-full relative">
        <Image
          src={category.image || "/images/placeholder.jpg"}
          alt="Photo"
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="absolute md:left-10 md:bottom-8 left-8 bottom-6">
          <h3 className=" text-white bn text-3xl font-bold">
            {category.label}
          </h3>
          <p className="text-white text-lg opacity-70">
            {category.description}
          </p>
        </div>
      </div>
      <ArticleFeed initialArticles={category.articles} category={params.category} />
    </>
  );
};

export default CategoryPage;
