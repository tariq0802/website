import SimpleCard from "@/components/simple-card";
import SmallCard from "@/components/small-card";
import { Separator } from "@/components/ui/separator";
import {
  CASE_UPDATE_ID,
  LIVE_UPDATE_ID,
  RECRUITMENT_UPDATE_ID,
  SELECTED_NEWS_ID,
} from "@/lib/constants";
import { Article, Category, User } from "@prisma/client";
import { ChevronRightIcon } from "@radix-ui/react-icons";

interface NewsSectionProps {
  articles: (Article & {
    author: User;
    category: Category & {
      parent: Category | null;
    };
  })[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ articles }) => {
  return (
    <section>
      <div className="flex bg-slate-700 px-3 pt-1 mb-2">
        <h2 className="bn text-xl font-bold text-white">সন্দেশ</h2>
      </div>
      <div className="md:grid grid-cols-2 gap-6">
        <div className="md:col-span-1 my-4">
          <div className="flex items-center px-3 mb-2 border-l-8 border-rose-500">
            <h2 className="bn text-lg font-bold text-slate-600">
              নিয়োগ বার্তা
            </h2>
            <ChevronRightIcon className="w-5 h-5 text-rose-500" />
          </div>
          <Separator />
          <div className="mt-4">
            <SmallCard
              data={articles
                .filter((x) => x.categoryId === RECRUITMENT_UPDATE_ID)
                .slice(0, 1)}
            />
            <SimpleCard
              data={articles
                .filter((x) => x.categoryId === RECRUITMENT_UPDATE_ID)
                .slice(1, 4)}
            />
          </div>
        </div>

        <div className="md:col-span-1 my-4">
          <div className="flex items-center px-3 mb-2 border-l-8 border-sky-500">
            <h2 className="bn text-lg font-bold text-slate-600">লাইভ বার্তা</h2>
            <ChevronRightIcon className="w-5 h-5 text-sky-500" />
          </div>
          <Separator />
          <div className="mt-4">
            <SmallCard
              data={articles
                .filter((x) => x.categoryId === LIVE_UPDATE_ID)
                .slice(0, 1)}
            />
            <SimpleCard
              data={articles
                .filter((x) => x.categoryId === LIVE_UPDATE_ID)
                .slice(1, 4)}
            />
          </div>
        </div>

        <div className="md:col-span-1 my-4">
          <div className="flex items-center px-3 mb-2 border-l-8 border-emerald-500">
            <h2 className="bn text-lg font-bold text-slate-600">
              মামলা বার্তা
            </h2>
            <ChevronRightIcon className="w-5 h-5 text-emerald-500" />
          </div>
          <Separator />
          <div className="mt-4">
            <SmallCard
              data={articles
                .filter((x) => x.categoryId === CASE_UPDATE_ID)
                .slice(0, 1)}
            />
            <SimpleCard
              data={articles
                .filter((x) => x.categoryId === CASE_UPDATE_ID)
                .slice(1, 4)}
            />
          </div>
        </div>

        <div className="md:col-span-1 my-4">
          <div className="flex items-center px-3 mb-2 border-l-8 border-amber-500">
            <h2 className="bn text-lg font-bold text-slate-600">নির্বাচিত</h2>
            <ChevronRightIcon className="w-5 h-5 text-amber-500" />
          </div>
          <Separator />
          <div className="mt-4">
            <SmallCard
              data={articles
                .filter((x) => x.categoryId === SELECTED_NEWS_ID)
                .slice(0, 1)}
            />
            <SimpleCard
              data={articles
                .filter((x) => x.categoryId === SELECTED_NEWS_ID)
                .slice(1, 4)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
