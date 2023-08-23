import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { formatTimeToNow } from "@/lib/utils";
import { Facebook, FacebookIcon, Share2, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ArticlePageProps {
  params: {
    article: string;
  };
}

const ArticlePage: React.FC<ArticlePageProps> = async ({ params }) => {
  const article = await db.article.findUnique({
    where: { slug: params.article },
    include: {
      category: { include: { parent: true } },
      author: true,
      tags: true,
    },
  });

  if (!article) {
    return <div>Not found</div>;
  }

  const roleMappings = {
    USER: "ইউজার",
    MEMBER: "মেম্বার",
    AUTHOR: "লেখক",
    ADMIN: "অ্যাডমিন",
  };

  const role = roleMappings[article.author.role] || article.author.role;

  return (
    <div className="flex flex-col md:grid grid-cols-3 gap-6 gap-y-10">
      <div className="md:col-span-2 bn">
        <Link href={`/${article.category.slug}`}>
          <p className="text-base font-semibold text-sky-800 py-1">
            {article.category.label}
          </p>
        </Link>
        <Separator className="mb-4"/>
        <h3 className="text-slate-600 text-2xl md:text-3xl font-bold">
          {article.title}
        </h3>

        <div className="mt-4 flex gap-3">
          <div className="relative h-12 md:h-14 md:w-14 w-12 rounded-full">
            <Image
              src={article.author.image || "/images/placeholder.jpg"}
              alt="Author"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex w-full justify-between">
            <div className="flex flex-col justify-center">
              <p className="en font-semibold text-slate-600">
                {article.author.name}
              </p>
              <p className="text-xs text-muted-foreground">{role}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex pt-2 items-center gap-2">
            <Share2 className="h-8 w-8 rounded-full bg-slate-100 p-2 shadow-md text-rose-500" />
            <Facebook className="h-8 w-8 rounded-full bg-slate-100 p-2 shadow-md text-blue-500" />
            <Twitter className="h-8 w-8 rounded-full bg-slate-100 p-2 shadow-md text-cyan-500" />
          </div>
          <div className="text-end text-xs text-muted-foreground">
            <p>
              প্রকাশ:{" "}
              <span className="en">{formatTimeToNow(article.createdAt)}</span>
            </p>
            <p>
              আপডেট:{" "}
              <span className="en">{formatTimeToNow(article.updatedAt)}</span>
            </p>
          </div>
        </div>
        <Separator className="my-4" />

        <div className="relative lg:h-80 h-60 w-full">
          <Image
            src={article.image || "/images/placeholder.jpg"}
            alt="Image"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        <Separator className="my-4" />

        <div>content</div>
      </div>
      <div className="md:col-span-1 bg-slate-50 min-h-[100vh]">
        <div className="flex bg-slate-700 px-3 pt-1">
          <Link href={`/`}>
            <h2 className="bn text-lg font-bold text-white">আর্কাইভ</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
