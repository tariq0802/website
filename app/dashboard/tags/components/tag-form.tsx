"use client";

import { Tag } from "@prisma/client";
import { AlertModal } from "@/components/alert-modal";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import slugify from "slugify";
import useFormMutation from "@/hooks/use-form-mutation";
import useDeleteMutation from "@/hooks/use-delete-mutation";
import Input from "@/components/input";
import TextArea from "@/components/text-area";

const formSchema = z.object({
  label: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().nullable(),
});

type TagFormValues = z.infer<typeof formSchema>;

interface TagFormProps {
  initialData: Tag | null;
}

const TagForm: React.FC<TagFormProps> = ({ initialData }) => {
  const title = initialData ? "Edit tag" : "Create tag";
  const description = initialData ? "Edit this tag." : "Add a new tag";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? { ...initialData }
    : {
        label: "",
        slug: "",
        description: "",
      };

  const form = useForm<TagFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const label = form.watch("label");

  useEffect(() => {
    const slugifiedLabel = slugify(label, { lower: true });
    form.setValue("slug", slugifiedLabel);
  }, [label, form]);

  const link = "/api/tags";
  const deleteLink = `/api/tags/${initialData?.slug}`;
  const refresh = "/dashboard/tags";

  const { mutate: categoryMutation, isLoading } = useFormMutation<
    TagFormValues,
    Tag
  >(link, initialData, refresh);

  const { deleteMutation, loading, open, setOpen } = useDeleteMutation(
    deleteLink,
    refresh
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
          onSubmit={form.handleSubmit((payload: TagFormValues) =>
            categoryMutation(payload)
          )}
          className="space-y-8 w-full"
        >
          <div className="flex flex-col gap-4">
            <Input
              form={form}
              name="label"
              label="Label"
              disabled={loading}
              placeholder="Tag Name"
            />
            <TextArea
              form={form}
              name="description"
              label="Description"
              disabled={loading}
              placeholder="Description of this tag"
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
export default TagForm;
