"use client";

import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { ImagePlus } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { FormControl, FormItem, FormLabel } from "./ui/form";

interface ImageUploadProps {
  onChange: (file: string) => void;
  existingImage?: string;
  label: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  existingImage,
  label,
}) => {
  const [src, setSrc] = useState(existingImage || "");

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("/api/upload", formData);
        const data = await response.data;
        const signedUrl = `${data.data.signedUrlPut}`;
        const url = "https://cgwebsite.s3.ap-south-1.amazonaws.com/";

        const signedUrlResponse = await axios.put(signedUrl, file, {
          headers: {
            "Content-Type": file.type,
          },
        });

        if (src) {
          try {
            const response = await axios.delete("/api/upload", {
              data: { imageUrl: src },
            });
            if (response.status === 200) {
              toast({
                title: "Image deleted",
                description: "The image has been successfully deleted.",
              });
            } else {
              toast({ title: "Error deleting image", variant: "destructive" });
            }
          } catch (error) {
            toast({ title: "Error deleting image", variant: "destructive" });
          }
        }

        if (signedUrlResponse.status === 200) {
          setSrc(url + data.data.fileName);
          onChange(url + data.data.fileName);
          toast({
            title: "Success !!!",
            description: "Image uploaded successfully.",
          });
        } else {
          toast({ title: "Error uploading file", variant: "destructive" });
        }
      } catch (error) {
        toast({ title: "Error uploading image", variant: "destructive" });
      } finally {
      }
    }
  };

  return (
    <div>
      <FormItem className="grid grid-cols-5 md:gap-6 gap-3">
        <FormLabel className="col-span-1 text-end">{label}</FormLabel>
        <label
          htmlFor="image_input"
          className="flex relative w-52 h-36 cursor-pointer appearance-none items-center justify-center rounded border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300"
        >
          {src ? (
            <Image src={src} fill alt="Photo" />
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
      </FormItem>
    </div>
  );
};

export default ImageUpload;
