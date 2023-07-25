"use client";

import { Case, CaseCategory } from "@prisma/client";
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
import Select from "@/components/select";
import Input from "@/components/input";
import TextArea from "@/components/text-area";
import useFormMutation from "@/hooks/use-form-mutation";
import useDeleteMutation from "@/hooks/use-delete-mutation";

const formSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  caseNo: z.string().min(2),
  petitioner: z.string().min(2),
  respondent: z.string().min(2),
  casefile: z.string().nullable(),
  caseCategoryId: z.string().min(2),
});

type CaseFormValues = z.infer<typeof formSchema>;

interface CaseFormProps {
  initialData: Case | null;
  caseCategories: CaseCategory[];
}

const CaseForm: React.FC<CaseFormProps> = ({ initialData, caseCategories }) => {
  const formTitle = initialData ? "Edit case" : "Create case";
  const formDescription = initialData ? "Edit this case." : "Add a new case";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? { ...initialData }
    : {
        title: "",
        slug: "",
        description: "",
        caseNo: "",
        petitioner: "",
        respondent: "",
        casefile: "",
        caseCategoryId: "",
      };

  const form = useForm<CaseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const caseNo = form.watch("caseNo");
  const petitioner = form.watch("petitioner");
  const respondent = form.watch("respondent");
  const title = form.watch("title");

  useEffect(() => {
    const slugifiedTitle = slugify(title, { lower: true });
    const causeTitle = `${caseNo} - ${petitioner} vs ${respondent}`;
    form.setValue("title", causeTitle);
    form.setValue("slug", slugifiedTitle);
  }, [caseNo, form, petitioner, respondent, title]);

  const link = "/api/cases";
  const deleteLink = `/api/cases/${initialData?.slug}`;
  const refresh = "/dashboard/cases";

  const { mutate: mutate, isLoading } = useFormMutation<CaseFormValues, Case>(
    link,
    initialData,
    refresh
  );

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
        <Heading title={formTitle} description={formDescription} />
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
          onSubmit={form.handleSubmit((payload: CaseFormValues) =>
            mutate(payload)
          )}
          className="space-y-8 w-full"
        >
          <div className="flex flex-col gap-4">
            <Input
              form={form}
              name="caseNo"
              label="Case No"
              disabled={loading}
              placeholder="Case Number"
            />
            <Input
              form={form}
              name="petitioner"
              label="Petitioner Name"
              disabled={loading}
              placeholder="Name of the petitioner"
            />
            <Input
              form={form}
              name="respondent"
              label="Respondent"
              disabled={loading}
              placeholder="Name of the respondent"
            />
            <Input
              form={form}
              name="casefile"
              label="Case File"
              disabled={loading}
              placeholder="Case file link"
            />
            <Select
              form={form}
              label="Category"
              name="caseCategoryId"
              data={caseCategories}
            />
            <TextArea
              form={form}
              name="description"
              label="Description"
              disabled={loading}
              placeholder="Description of this case"
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
export default CaseForm;
