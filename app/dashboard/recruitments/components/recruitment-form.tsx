"use client";

import { Recruitment, RecruitmentBoard } from "@prisma/client";
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
import useFormMutation from "@/hooks/use-form-mutation";
import useDeleteMutation from "@/hooks/use-delete-mutation";
import Select from "@/components/select";
import DateInput from "@/components/date-input";
import TextArea from "@/components/text-area";

const formSchema = z.object({
  label: z.string().min(2),
  slug: z.string().min(2),
  vacancy: z.string().nullable(),
  salary: z.string().nullable(),
  lastDate: z.date().nullable(),
  description: z.string().nullable(),
  qualification: z.string().nullable(),
  recruitmentBoardId: z.string(),
});

type RecruitmentFormValues = z.infer<typeof formSchema>;

interface RecruitmentFormProps {
  initialData: Recruitment | null;
  authorities: RecruitmentBoard[];
}

const RecruitmentForm: React.FC<RecruitmentFormProps> = ({
  initialData,
  authorities,
}) => {
  const formTitle = initialData ? "Edit recruitment" : "Create recruitment";
  const formDescription = initialData
    ? "Edit this recruitment."
    : "Add a new recruitment";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? { ...initialData }
    : {
        label: "",
        slug: "",
        vacancy: "",
        salary: "",
        lastDate: undefined,
        description: "",
        qualification: "",
        recruitmentBoardId: "",
      };

  const form = useForm<RecruitmentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const label = form.watch("label");

  useEffect(() => {
    const slugifiedLabel = slugify(label, { lower: true });
    form.setValue("slug", slugifiedLabel);
  }, [form, label]);

  const link = "/api/recruitments";
  const deleteLink = `/api/recruitments/${initialData?.slug}`;
  const refresh = "/dashboard/recruitments";

  const { mutate: mutate, isLoading } = useFormMutation<
    RecruitmentFormValues,
    Recruitment
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
          onSubmit={form.handleSubmit((payload: RecruitmentFormValues) =>
            mutate(payload)
          )}
          className="space-y-8 w-full"
        >
          <div className="flex flex-col gap-4">
            <Select
              form={form}
              label="Authority"
              name="recruitmentBoardId"
              data={authorities}
            />
            <DateInput form={form} name="lastDate" label="Last date" />
            <Input
              form={form}
              name="label"
              label="Label"
              disabled={loading}
              placeholder="Recruitment title"
            />
            <Input
              form={form}
              name="vacancy"
              label="Vacancy"
              disabled={loading}
              placeholder="Recruitment vacancies"
            />
            <Input
              form={form}
              name="salary"
              label="Salary"
              disabled={loading}
              placeholder="Salary"
            />
            <Input
              form={form}
              name="qualification"
              label="Qualification"
              disabled={loading}
              placeholder="Minimum qualification"
            />
            <TextArea
              form={form}
              label="Description"
              name="description"
              disabled={loading}
              placeholder="Recruitment description"
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
export default RecruitmentForm;
