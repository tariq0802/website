"use client";

import { CaseCategory } from "@prisma/client";
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
import Input from "@/components/input";
import TextArea from "@/components/text-area";
import useFormMutation from "@/hooks/use-form-mutation";
import useDeleteMutation from "@/hooks/use-delete-mutation";

const formSchema = z.object({
  label: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().nullable(),
});

type CaseCategoryFormValues = z.infer<typeof formSchema>;

interface CaseCategoryFormProps {
  initialData: CaseCategory | null;
}

const CaseCategoryForm: React.FC<CaseCategoryFormProps> = ({ initialData }) => {
  const title = initialData ? "Edit case category" : "Create case category";
  const description = initialData
    ? "Edit this case category."
    : "Add a new case category";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? { ...initialData }
    : {
        label: "",
        slug: "",
        description: "",
      };

  const form = useForm<CaseCategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const label = form.watch("label");

  useEffect(() => {
    const slugifiedLabel = slugify(label, { lower: true });
    form.setValue("slug", slugifiedLabel);
  }, [label, form]);

  const link = "/api/case-categories";
  const deleteLink = `/api/case-categories/${initialData?.slug}`;
  const refresh = "/dashboard/case-categories";

  const { mutate: mutate, isLoading } = useFormMutation<
    CaseCategoryFormValues,
    CaseCategory
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
          onSubmit={form.handleSubmit((payload: CaseCategoryFormValues) =>
            mutate(payload)
          )}
          className="space-y-8 w-full"
        >
          <div className="flex flex-col gap-4">
            <Input
              form={form}
              name="label"
              label="Label"
              disabled={loading}
              placeholder="Case Category Name"
            />
            <TextArea
              form={form}
              name="description"
              label="Description"
              disabled={loading}
              placeholder="Description of this case category"
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
export default CaseCategoryForm;
