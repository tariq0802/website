"use client";

import { toast } from "@/hooks/use-toast";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import axios from "axios";
import { ImagePlus, Loader } from "lucide-react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import MyImage from "./image";
import { Client } from "@/lib/client";

interface ImageUploadProps {
  onChange: (file: string) => void;
  existingImage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  existingImage,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [src, setSrc] = useState(existingImage || "");

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setIsLoading(true);

      const key = `uploads/${uuid()}.jpg`;

      const uploadCommand = new PutObjectCommand({
        Bucket: "cgwebsite",
        Key: key,
        ContentType: "image/jpeg",
        Body: file,
      });

      try {
        const preSignedUrl = await getSignedUrl(Client, uploadCommand, {
          expiresIn: 20,
        });

        await axios.put(preSignedUrl, file, {
          headers: {
            "Content-Type": "image/jpeg",
          },
        });
        toast({ title: "Image uploaded successfully", variant: "default" });

        setSrc(key);
        onChange(key);
      } catch (error) {
        toast({ title: "Error uploading image", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <label
        htmlFor="image_input"
        className="flex relative w-52 h-36 cursor-pointer appearance-none items-center justify-center rounded border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300"
      >
        {src ? (
          <MyImage src={src} fill alt="Photo" />
        ) : (
          <div className="space-y-1 text-center">
            <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <ImagePlus size={40} />
            </div>
          </div>
        )}
      </label>
      <input
        className="sr-only block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="image_input"
        type="file"
        accept="image/*,video/*"
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default ImageUpload;
