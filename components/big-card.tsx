"use client";

import { formatTimeToNow } from "@/lib/utils";
import { Article, Category, User } from "@prisma/client";
import { ChatBubbleIcon, HeartIcon } from "@radix-ui/react-icons";
import Image from "next/image";

interface BigCardProps {
  data: (Article & {
    category: Category & {
      parent: Category | null;
    };
    author: User;
  })[];
}

const BigCard: React.FC<BigCardProps> = ({ data }) => {
  return (
    <div>
      {data.map((item) => (
        <div key={item.id} className="shadow">
          <div className="relative h-52 w-full">
            <Image
              src={item.image || "/images/placeholder.jpg"}
              alt="Photo"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="p-3 flex flex-col gap-2">
            <div className="flex gap-2">
              <p className="bn text-sky-700 text-sm font-semibold">
                {item.category.parent?.label}
              </p>
              <p className="bn text-emerald-700 text-sm font-semibold">
                {item.category.label}
              </p>
            </div>
            <h3 className="bn text-xl font-bold text-slate-600">
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
      ))}
    </div>
  );
};
export default BigCard;
