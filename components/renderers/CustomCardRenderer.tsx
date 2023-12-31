"use client";

import Image from "next/image";
import Link from "next/link";

function CustomCardRenderer({ data }: any) {
  return (
    <div className="bg-slate-50 mb-5 p-4 shadow">
      <p className="font-bold mb-2 text-base">আরও পড়ুন:</p>
      <div className="flex flex-col gap-3">
        {data.map((item: any) => (
          <Link key={item.id} href={`/${item.category.slug}/${item.slug}`}>
            <div className="border-2 p-2 flex w-full justify-between gap-8 items-center">
              <p className="max-h-14 overflow-hidden font-medium">
                {item.title}
              </p>
              <div className="relative h-14 w-[35%] max-w-[110px]">
                <Image
                  src={item.image}
                  alt="Photo"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CustomCardRenderer;
