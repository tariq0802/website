import Recruitment from "@/components/recruitment";
import { db } from "@/lib/db";

const HomePage = async () => {
  const recruitments = await db.recruitment.findMany({
    orderBy: { lastDate: "desc" },
    include: { recruitmentBoard: true },
  });
  return (
    <main>
      <section className="md:grid grid-cols-7 space-y-6 gap-6">
        <div className="col-span-5 space-y-3">
          <div className="h-80 bg-slate-100">a</div>
          <div className="h-48 bg-blue-200">a1</div>
          <div className="h-48 bg-rose-200">a2</div>
        </div>
        <div className="col-span-2">
          <Recruitment recruitments={recruitments} />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
