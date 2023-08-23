import Orders from "@/components/orders";
import Recruitment from "@/components/recruitment";
import SmallCard from "@/components/small-card";
import { db } from "@/lib/db";
import NewsSection from "./components/news-section";
import GuidanceSection from "./components/guidance-section";
import BigCard from "@/components/big-card";

const HomePage = async () => {
  const recruitments = await db.recruitment.findMany({
    orderBy: { lastDate: "desc" },
    include: { recruitmentBoard: true },
    take: 5,
  });

  const orders = await db.caseOrder.findMany({
    orderBy: { orderDate: "desc" },
    include: { case: true },
    take: 5,
  });

  const articles = await db.article.findMany({
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
    <main>
      <section className="md:grid grid-cols-3 gap-6 md:gap-7 lg:gap-10 space-y-6 md:space-y-0">
        <div className="col-span-2 space-y-3 mb-4">
          <BigCard data={articles.slice(0, 1)} />
          <SmallCard data={articles.slice(1, 3)} />
        </div>
        <div className="col-span-1 space-y-8">
          <Recruitment recruitments={recruitments} />
          <Orders orders={orders} />
        </div>
      </section>
      <div className="space-y-10 mt-10">
        <NewsSection articles={articles} />
        <GuidanceSection articles={articles} />
      </div>
    </main>
  );
};

export default HomePage;
