import BigCard from "@/components/big-card";
import Orders from "@/components/orders";
import Recruitment from "@/components/recruitment";
import SimpleCard from "@/components/simple-card";
import SmallCard from "@/components/small-card";
import { GUIDANCE_ID, NEWS_ID } from "@/lib/constants";
import { db } from "@/lib/db";
import NewsSection from "./components/news-section";
import GuidanceSection from "./components/guidance-section";

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
    include: { category: { include: { parent: true } }, author: true },
    take: 10,
  });
  return (
    <main>
      <section className="md:grid grid-cols-3 gap-6 md:gap-7 lg:gap-10 space-y-6 md:space-y-0">
        <div className="col-span-2 space-y-3">
          <BigCard data={articles.slice(0, 1)} />
          <SmallCard data={articles.slice(1, 3)} />
        </div>
        <div className="col-span-1 space-y-8">
          <Recruitment recruitments={recruitments} />
          <Orders orders={orders} />
        </div>
      </section>
      <NewsSection articles={articles} />
      <GuidanceSection articles={articles} />
    </main>
  );
};

export default HomePage;
