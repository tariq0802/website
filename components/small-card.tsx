"use client";

import { formatTimeToNow } from "@/lib/utils";
import { HeartIcon, ChatBubbleIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { Article } from "@prisma/client";

interface SmallCardProps {
  data: (Article & {
    category: { slug: string; label: string } & {
      parent: { slug: string; label: string } | null;
    };
    author: { name: string | null };
  })[];
}

const SmallCard: React.FC<SmallCardProps> = ({ data }) => {
  return (
    <div className="shadow">
      {data.map((item) => (
        <div key={item.id}>
          <div className="flex w-full py-1">
            <div className="relative w-[60%] m-3 mr-0">
              <Link href={`/${item.category.slug}/${item.slug}`}>
                <Image
                  src={item.image || "/images/placeholder.jpg"}
                  alt="Photo"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Link>
            </div>
            <div className="p-3 flex flex-col gap-1 w-full">
              <div className="flex justify-between text-sm">
                <Link href={`/${item.category.slug}`}>
                  <p className="bn text-sky-800 font-semibold">
                    {item.category.label}
                  </p>
                </Link>
              </div>
              <Link href={`/${item.category.slug}/${item.slug}`}>
                <h3 className="bn text-md font-bold text-slate-600 h-[50px] overflow-hidden">
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
                  {formatTimeToNow(new Date(item.createdAt))}
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
export default SmallCard;
