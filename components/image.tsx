"use client";

import { Client } from "@/lib/client";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Image from "next/image";
import { useEffect, useState } from "react";

interface imageProps {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
}

const MyImage: React.FC<imageProps> = ({ src, alt, fill, height, width }) => {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    const fetchCommand = new GetObjectCommand({
      Bucket: "cgwebsite",
      Key: src,
    });
    const fetchNewSrc = async () => {
      const preSignedFetchUrl = await getSignedUrl(Client, fetchCommand);
      setUrl(preSignedFetchUrl);
    };
    fetchNewSrc();
  }, [src]);

  return (
    <div>
      <Image
        src={url || "/images/placeholder.jpg"}
        fill={fill}
        alt={alt}
        height={height}
        width={width}
      />
    </div>
  );
};
export default MyImage;
