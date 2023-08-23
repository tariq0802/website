"use client";

import { formatTimeToNow } from "@/lib/utils";
import { Article, Category, User } from "@prisma/client";
import { ChatBubbleIcon, HeartIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

interface BigCardProps {
  data: (Article & {
    category: { slug: string; label: string } & {
      parent: { slug: string; label: string } | null;
    };
    author: { name: string | null };
  })[];
}

const BigCard: React.FC<BigCardProps> = ({ data }) => {
  return (
    <div>
      {data.map((item) => (
        <div key={item.id} className="shadow">
          <Link href={`/${item.category.slug}/${item.slug}`}>
            <div className="relative h-52 w-full">
              <Image
                src={item.image || "/images/placeholder.jpg"}
                alt="Photo"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </Link>
          <div className="p-3 flex flex-col gap-2">
            <div className="flex gap-2">
              {item.category.parent && (
                <Link href={`/${item.category.parent.slug}`}>
                  <p className="bn text-sky-700 font-semibold">
                    {item.category.parent?.label}
                  </p>
                </Link>
              )}
              <Link href={`/${item.category.slug}`}>
                <p className="bn text-emerald-700 font-semibold">
                  {item.category.label}
                </p>
              </Link>
            </div>
            <Link href={`/${item.category.slug}/${item.slug}`}>
              <h3 className="bn text-xl font-bold text-slate-600">
                {item.title}
              </h3>
            </Link>
            <p className="text-semibold text-muted-foreground">
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
      ))}
    </div>
  );
};
export default BigCard;
