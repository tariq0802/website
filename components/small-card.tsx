"use client";

import { formatTimeToNow } from "@/lib/utils";
import { Article, Category, User } from "@prisma/client";
import { HeartIcon, ChatBubbleIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Separator } from "./ui/separator";

interface SmallCardProps {
  data: (Article & {
    category: Category & {
      parent: Category | null;
    };
    author: User;
  })[];
}

const SmallCard: React.FC<SmallCardProps> = ({ data }) => {
  return (
    <div className="shadow">
      {data.map((item) => (
        <div key={item.id} className="">
          <div className="flex w-full py-1">
            <div className="relative h-30 w-[60%] m-4 mr-0">
              <Image
                src={item.image || "/images/placeholder.jpg"}
                alt="Photo"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="p-3 flex flex-col gap-2 w-full">
              <div className="flex justify-between text-xs">
                <p className="bn text-sky-800 font-semibold">
                  {item.category.label}
                </p>
                <p className="bn text-lime-800 font-semibold">
                  {item.category.parent?.label}
                </p>
              </div>
              <h3 className="bn font-bold text-slate-600 h-[44px] overflow-hidden">
                {item.title}
              </h3>
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
          <Separator />
        </div>
      ))}
    </div>
  );
};
export default SmallCard;
