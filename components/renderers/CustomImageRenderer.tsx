"use client";

import Image from "next/image";

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="py-2">
      <div className="relative w-full min-h-[15rem]">
        <Image
          alt="image"
          className="object-contain"
          fill
          src={src}
          style={{ objectFit: "cover" }}
        />
      </div>
      <p className="text-xs italic">{data.caption}</p>
    </div>
  );
}

export default CustomImageRenderer;
