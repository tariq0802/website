"use client";

import { AlertModal } from "@/components/alert-modal";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import slugify from "slugify";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/image-upload";
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
  label: z.string().min(2),
  slug: z.string().min(2),
  image: z.string().nullable(),
  description: z.string().nullable(),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  initialData: Category | null;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(initialData?.image || "");

  const title = initialData ? "Edit category" : "Create category";
  const description = initialData ? "Edit a category." : "Add a new category";
  const toastMessage = initialData ? "Category updated." : "Category created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? { ...initialData }
    : {
        label: "",
        slug: "",
        image: "",
        description: "",
      };

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const label = form.watch("label");

  useEffect(() => {
    const slugifiedLabel = slugify(label, { lower: true });
    form.setValue("slug", slugifiedLabel);
    form.setValue("image", imageSrc);
  }, [label, form, imageSrc]);

  const { mutate: categoryMutation, isLoading } = useMutation({
    mutationFn: async (payload: CategoryFormValues) => {
      if (initialData) {
        const { data } = await axios.patch(
          `/api/categories/${params.categorySlug}`,
          payload
        );
        return data;
      } else {
        const { data } = await axios.post(`/api/categories`, payload);
        return data;
      }
    },
    onError: (err: any) => {
      return toast({ title: "Something went wrong.", variant: "destructive" });
    },
    onSuccess: () => {
      router.push(pathname.split("/").slice(0, 3).join("/"));
      router.refresh();
      return toast({ title: toastMessage });
    },
  });

  const { mutate: deleteCategory, isLoading: loading } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/categories/${params.categorySlug}`);
    },
    onSuccess: () => {
      router.push("/dashboard/categories");
      router.refresh();
      return toast({ title: "Tag deleted" });
    },
    onError: (err: any) => {
      return toast({ title: "Something went wrong.", variant: "destructive" });
    },
  });

  return (
    <div>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={deleteCategory}
        loading={loading}
      />

      <div className="flex items-center justify-between pb-2">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator className="mb-8" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((e) => categoryMutation(e))}
          className="space-y-8 w-full"
        >
          <div className="flex flex-col gap-4">
            <FormItem className="md:grid md:grid-cols-4 gap-6">
              <FormLabel className="md:col-span-1 text-end pt-4">
                Image
              </FormLabel>
              <div className="md:col-span-3">
                <ImageUpload
                  onChange={(src: string) => setImageSrc(src)}
                  existingImage={initialData?.image || undefined}
                />
              </div>
            </FormItem>

            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem className="md:grid md:grid-cols-4 gap-6 ">
                  <FormLabel className="md:col-span-1 text-end pt-4">
                    Label
                  </FormLabel>
                  <FormControl className="md:col-span-3">
                    <Input
                      disabled={loading}
                      placeholder="Category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:grid md:grid-cols-4 gap-6">
                  <FormLabel className="md:col-span-1 text-end pt-4">
                    Description
                  </FormLabel>
                  <FormControl className="md:col-span-3">
                    <Textarea
                      disabled={loading}
                      placeholder="Description of this category"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} className="ml-auto" type="submit">
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
