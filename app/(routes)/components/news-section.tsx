import SimpleCard from "@/components/simple-card";
import SmallCard from "@/components/small-card";
import { Separator } from "@/components/ui/separator";
import {
  CASE_UPDATE_ID,
  CASE_UPDATE_SLUG,
  LIVE_UPDATE_ID,
  LIVE_UPDATE_SLUG,
  NEWS_SLUG,
  RECRUITMENT_UPDATE_ID,
  RECRUITMENT_UPDATE_SLUG,
  SELECTED_NEWS_ID,
  SELECTED_NEWS_SLUG,
} from "@/lib/constants";
import { Article } from "@prisma/client";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface NewsSectionProps {
  articles: (Article & {
    author: { name: string | null };
    category: { slug: string; label: string } & {
      parent: { slug: string; label: string } | null;
    };
  })[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ articles }) => {

  return (
    <section>
      <div className="flex bg-slate-700 px-3 pt-1 my-6">
        <Link href={`/${NEWS_SLUG}`}>
          <h2 className="bn text-xl font-bold text-white">সন্দেশ</h2>
        </Link>
      </div>
      <div className="md:grid grid-cols-2 flex flex-col gap-y-10 gap-8">
        <div className="md:col-span-1">
          <div className="flex items-center px-3 mb-2 border-l-8 border-rose-500">
            <Link href={`/${RECRUITMENT_UPDATE_SLUG}`}>
              <h2 className="bn text-lg font-bold text-slate-600">
                নিয়োগ বার্তা
              </h2>
            </Link>
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

        <div className="md:col-span-1">
          <div className="flex items-center px-3 mb-2 border-l-8 border-sky-500">
            <Link href={`/${LIVE_UPDATE_SLUG}`}>
              <h2 className="bn text-lg font-bold text-slate-600">
                লাইভ বার্তা
              </h2>
            </Link>
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

        <div className="md:col-span-1">
          <div className="flex items-center px-3 mb-2 border-l-8 border-emerald-500">
            <Link href={`/${CASE_UPDATE_SLUG}`}>
              <h2 className="bn text-lg font-bold text-slate-600">
                মামলা বার্তা
              </h2>
            </Link>
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

        <div className="md:col-span-1">
          <div className="flex items-center px-3 mb-2 border-l-8 border-amber-500">
            <Link href={`/${SELECTED_NEWS_SLUG}`}>
              <h2 className="bn text-lg font-bold text-slate-600">নির্বাচিত</h2>
            </Link>
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
