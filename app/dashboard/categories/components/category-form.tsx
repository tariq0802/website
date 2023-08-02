"use client";

import { AlertModal } from "@/components/alert-modal";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Form, FormItem, FormLabel } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import slugify from "slugify";
import ImageUpload from "@/components/image-upload";
import useFormMutation from "@/hooks/use-form-mutation";
import useDeleteMutation from "@/hooks/use-delete-mutation";
import Input from "@/components/input";
import TextArea from "@/components/text-area";

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
  const [imageSrc, setImageSrc] = useState(initialData?.image || "");

  const title = initialData ? "Edit category" : "Create category";
  const description = initialData ? "Edit a category." : "Add a new category";
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

  const link = "/api/categories";
  const deleteLink = `/api/categories/${initialData?.slug}`;
  const refresh = "/dashboard/categories";

  const { mutate: categoryMutation, isLoading } = useFormMutation<
    CategoryFormValues,
    Category
  >(link, initialData, refresh);

  const { deleteMutation, loading, open, setOpen } = useDeleteMutation(
    deleteLink,
    refresh,
    imageSrc
  );

  return (
    <div>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={deleteMutation}
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
          onSubmit={form.handleSubmit((payload: CategoryFormValues) =>
            categoryMutation(payload)
          )}
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

            <Input
              form={form}
              name="label"
              label="Label"
              disabled={loading}
              placeholder="Category Name"
            />
            <TextArea
              form={form}
              name="description"
              label="Description"
              disabled={loading}
              placeholder="Description of this authority"
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
