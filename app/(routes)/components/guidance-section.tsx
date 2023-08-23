import SimpleCard from "@/components/simple-card";
import SmallCard from "@/components/small-card";
import { Separator } from "@/components/ui/separator";
import {
  CAREER_ID,
  CAREER_SLUG,
  CURRENT_AFFAIRS_ID,
  CURRENT_AFFAIRS_SLUG,
  GENERAL_KNOWLEDGE_ID,
  GENERAL_KNOWLEDGE_SLUG,
  GUIDANCE_SLUG,
  INTERVIEW_PREPARETION_ID,
  INTERVIEW_PREPARETION_SLUG,
  MADRASAH_SERVICE_ID,
  MADRASAH_SERVICE_SLUG,
  MOCK_TEST_ID,
  MOCK_TEST_SLUG,
  PRIMARY_ID,
  PRIMARY_SLUG,
  SCHOOL_SERVICE_ID,
  SCHOOL_SERVICE_SLUG,
} from "@/lib/constants";
import { Article } from "@prisma/client";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface GuidanceSectionProps {
  articles: (Article & {
    author: { name: string | null };
    category: { slug: string; label: string } & {
      parent: { slug: string; label: string } | null;
    };
  })[];
}

const GuidanceSection: React.FC<GuidanceSectionProps> = ({ articles }) => {
  return (
    <section className="space-y-6">
      <div className="flex bg-slate-700 px-3 pt-1 mb-2">
        <Link href={`/${GUIDANCE_SLUG}`}>
          <h2 className="bn text-xl font-bold text-white">গাইডেন্স</h2>
        </Link>
      </div>
      <div className="md:grid grid-cols-2 gap-6">
        <div className="md:col-span-1 my-4">
          <div className="flex items-center px-3 mb-2 border-l-8 border-rose-500">
            <Link href={`/${GENERAL_KNOWLEDGE_SLUG}`}>
              <h2 className="bn text-lg font-bold text-slate-600">
                জেনারেল নলেজ
              </h2>
            </Link>
            <ChevronRightIcon className="w-5 h-5 text-rose-500" />
          </div>
          <Separator />
          <div className="mt-4">
            <SmallCard
              data={articles
                .filter((x) => x.categoryId === GENERAL_KNOWLEDGE_ID)
                .slice(0, 1)}
            />
            <SimpleCard
              data={articles
                .filter((x) => x.categoryId === GENERAL_KNOWLEDGE_ID)
                .slice(1, 4)}
            />
          </div>
        </div>

        <div className="md:col-span-1 my-4">
          <div className="flex items-center px-3 mb-2 border-l-8 border-sky-500">
            <Link href={`/${CURRENT_AFFAIRS_SLUG}`}>
              <h2 className="bn text-lg font-bold text-slate-600">
                কারেন্ট এফেয়ার্স
              </h2>
            </Link>
            <ChevronRightIcon className="w-5 h-5 text-sky-500" />
          </div>
          <Separator />
          <div className="mt-4">
            <SmallCard
              data={articles
                .filter((x) => x.categoryId === CURRENT_AFFAIRS_ID)
                .slice(0, 1)}
            />
            <SimpleCard
              data={articles
                .filter((x) => x.categoryId === CURRENT_AFFAIRS_ID)
                .slice(1, 4)}
            />
          </div>
        </div>

        <div className="md:col-span-1 my-4">
          <div className="flex items-center px-3 mb-2 border-l-8 border-emerald-500">
            <Link href={`/${PRIMARY_SLUG}`}>
              <h2 className="bn text-lg font-bold text-slate-600">প্রাইমারি</h2>
            </Link>
            <ChevronRightIcon className="w-5 h-5 text-emerald-500" />
          </div>
          <Separator />
          <div className="mt-4">
            <SmallCard
              data={articles
                .filter((x) => x.categoryId === PRIMARY_ID)
                .slice(0, 1)}
            />
            <SimpleCard
              data={articles
                .filter((x) => x.categoryId === PRIMARY_ID)
                .slice(1, 4)}
            />
          </div>
        </div>

        <div className="md:col-span-1 my-4">
          <div className="flex items-center px-3 mb-2 border-l-8 border-amber-500">
            <Link href={`/${SCHOOL_SERVICE_SLUG}`}>
              <h2 className="bn text-lg font-bold text-slate-600">
                স্কুল সার্ভিস
              </h2>
            </Link>
            <ChevronRightIcon className="w-5 h-5 text-amber-500" />
          </div>
          <Separator />
          <div className="mt-4">
            <SmallCard
              data={articles
                .filter((x) => x.categoryId === SCHOOL_SERVICE_ID)
                .slice(0, 1)}
            />
            <SimpleCard
              data={articles
                .filter((x) => x.categoryId === SCHOOL_SERVICE_ID)
                .slice(1, 4)}
            />
          </div>
        </div>

        <div className="md:col-span-1 my-4">
          <div className="flex items-center px-3 mb-2 border-l-8 border-cyan-500">
            <Link href={`/${MADRASAH_SERVICE_SLUG}`}>
              <h2 className="bn text-lg font-bold text-slate-600">
                মাদ্রাসা সার্ভিস
              </h2>
            </Link>
            <ChevronRightIcon className="w-5 h-5 text-cyan-500" />
          </div>
          <Separator />
          <div className="mt-4">
            <SmallCard
              data={articles
                .filter((x) => x.categoryId === MADRASAH_SERVICE_ID)
                .slice(0, 1)}
            />
            <SimpleCard
              data={articles
                .filter((x) => x.categoryId === MADRASAH_SERVICE_ID)
                .slice(1, 4)}
            />
          </div>
        </div>

        <div className="md:col-span-1 my-4">
          <div className="flex items-center px-3 mb-2 border-l-8 border-pink-500">
            <Link href={`/${INTERVIEW_PREPARETION_SLUG}`}>
              <h2 className="bn text-lg font-bold text-slate-600">
                ইন্টারভিউ প্রস্তুতি
              </h2>
            </Link>
            <ChevronRightIcon className="w-5 h-5 text-pink-500" />
          </div>
          <Separator />
          <div className="mt-4">
            <SmallCard
              data={articles
                .filter((x) => x.categoryId === INTERVIEW_PREPARETION_ID)
                .slice(0, 1)}
            />
            <SimpleCard
              data={articles
                .filter((x) => x.categoryId === INTERVIEW_PREPARETION_ID)
                .slice(1, 4)}
            />
          </div>
        </div>

        <div className="md:col-span-1 my-4">
          <div className="flex items-center px-3 mb-2 border-l-8 border-indigo-500">
            <Link href={`/${MOCK_TEST_SLUG}`}>
              <h2 className="bn text-lg font-bold text-slate-600">মক টেস্ট</h2>
            </Link>
            <ChevronRightIcon className="w-5 h-5 text-indigo-500" />
          </div>
          <Separator />
          <div className="mt-4">
            <SmallCard
              data={articles
                .filter((x) => x.categoryId === MOCK_TEST_ID)
                .slice(0, 1)}
            />
            <SimpleCard
              data={articles
                .filter((x) => x.categoryId === MOCK_TEST_ID)
                .slice(1, 4)}
            />
          </div>
        </div>

        <div className="md:col-span-1 my-4">
          <div className="flex items-center px-3 mb-2 border-l-8 border-slate-500">
            <Link href={`/${CAREER_SLUG}`}>
              <h2 className="bn text-lg font-bold text-slate-600">কেরিয়ার</h2>
            </Link>
            <ChevronRightIcon className="w-5 h-5 text-slate-500" />
          </div>
          <Separator />
          <div className="mt-4">
            <SmallCard
              data={articles
                .filter((x) => x.categoryId === CAREER_ID)
                .slice(0, 1)}
            />
            <SimpleCard
              data={articles
                .filter((x) => x.categoryId === CAREER_ID)
                .slice(1, 4)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuidanceSection;
