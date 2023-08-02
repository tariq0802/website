"use client";

import axios from "axios";
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
    const fetchSignedUrl = async () => {
      try {
        const response = await axios.get(`/api/upload?key=${src}`);
        setUrl(response.data.data);
      } catch (error) {
        console.error("Error fetching signed URL:", error);
      }
    };
    if (src) {
      fetchSignedUrl();
    }
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
