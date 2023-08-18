import BigCard from "@/components/big-card";
import Orders from "@/components/orders";
import Recruitment from "@/components/recruitment";
import SmallCard from "@/components/small-card";
import { db } from "@/lib/db";

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
      <section className="md:grid grid-cols-3 gap-6 space-y-6 md:space-y-0">
        <div className="col-span-2 space-y-3">
          {/* BigCard */}
          <BigCard data={articles.slice(0, 1)} />

          {/* SmallCard */}
          <SmallCard data={articles.slice(1, 3)} />
        </div>
        <div className="col-span-1 space-y-8">
          {/* Recruitment */}
          <Recruitment recruitments={recruitments} />

          {/* Orders */}
          <Orders orders={orders} />
        </div>
      </section>

      {/* Sandesh Section */}
      <section className="py-4">
        <div className="flex bg-slate-700 px-3 pt-1 mb-4">
          <h2 className="bn text-lg font-bold text-white">সন্দেশ</h2>
        </div>
        <SmallCard
          data={articles.filter(
            (x) => x.category.parentId === "cll2p69yq0001rvg050ck12j2"
          )}
        />
      </section>
    </main>
  );
};

export default HomePage;
