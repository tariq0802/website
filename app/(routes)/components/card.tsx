import { FeedArticle } from "@/types/article";
import { formatTimeToNow } from "@/lib/utils";
import { HeartIcon, ChatBubbleIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

interface CardProps {
  article: FeedArticle;
}

const Card: React.FC<CardProps> = ({ article }) => {
  return (
    <div className="shadow">
      <div className="flex w-full py-1">
        <Link
          href={`/${article.category.slug}/${article.slug}`}
          className="relative w-[60%] m-3 mr-0"
        >
          <Image
            src={article.image || "/images/placeholder.jpg"}
            alt="Photo"
            fill
            style={{ objectFit: "cover" }}
          />
        </Link>
        <div className="p-3 flex flex-col gap-1 w-full">
          <Link
            href={`/${article.category.slug}`}
            className="flex justify-between text-sm"
          >
            <p className="bn text-sky-800 font-semibold">
              {article.category.label}
            </p>
          </Link>
          <Link href={`/${article.category.slug}/${article.slug}`}>
            <h3 className="bn text-md font-bold text-slate-600 h-[50px] overflow-hidden">
              {article.title}
            </h3>
          </Link>
          <p className="text-semibold text-xs text-muted-foreground">
            {article.author.name}
          </p>
          <div className="flex justify-between articles-center">
            <div className="flex gap-4 justify-start articles-center text-rose-500">
              <div className="flex gap-1 justify-start articles-center">
                <HeartIcon />
                <p className="text-xs text-muted-foreground">20</p>
              </div>
              <div className="flex gap-1 justify-start articles-center text-sky-600">
                <ChatBubbleIcon />
                <p className="text-xs text-muted-foreground">20</p>
              </div>
            </div>
            <p className="text-semibold text-xs text-muted-foreground">
              {formatTimeToNow(new Date(article.createdAt))}
            </p>
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
};
export default Card;
