"use client";

import { formatTimeToNow } from "@/lib/utils";
import { Article } from "@prisma/client";
import { ChatBubbleIcon, HeartIcon } from "@radix-ui/react-icons";
import { Separator } from "./ui/separator";
import Link from "next/link";

interface SimpleCardProps {
  data: (Article & {
    category: { slug: string; label: string } & {
      parent: { slug: string; label: string } | null;
    };
    author: { name: string | null };
  })[];
}

const SimpleCard: React.FC<SimpleCardProps> = ({ data }) => {
  return (
    <div className="shadow">
      {data.map((item) => (
        <div key={item.id} className="">
          <div className="flex w-full py-1">
            <div className="p-3 flex flex-col gap-1 w-full">
              <Link href={`/${item.category.slug}`}>
                <p className="bn text-sky-800 text-sm font-medium">
                  {item.category.label}
                </p>
              </Link>
              <Link href={`/${item.category.slug}/${item.slug}`}>
                <h3 className="bn font-bold text-base text-slate-600 h-[20px] overflow-hidden">
                  {item.title}
                </h3>
              </Link>
              <p className="text-semibold text-xs text-muted-foreground">
                {item.author.name}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex gap-4 justify-start items-center text-rose-500">
                  <div className="flex gap-1 justify-start items-center">
                    <HeartIcon />
                    <p className="text-xs text-muted-foreground">20</p>
                  </div>
                  <div className="flex gap-1 justify-start items-center text-sky-600">
                    <ChatBubbleIcon />
                    <p className="text-xs text-muted-foreground">20</p>
                  </div>
                </div>
                <p className="text-semibold text-xs text-muted-foreground">
                  {formatTimeToNow(item.createdAt)}
                </p>
              </div>
            </div>
          </div>
          <Separator />
        </div>
      ))}
    </div>
  );
};
export default SimpleCard;
