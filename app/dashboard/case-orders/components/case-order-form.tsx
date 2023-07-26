"use client";

import { Case, CaseOrder } from "@prisma/client";
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

const formSchema = z.object({
  label: z.string().min(2),
  slug: z.string().min(2),
  order: z.string().min(2),
  orderDate: z.date(),
  caseId: z.string(),
});

type CaseOrderFormValues = z.infer<typeof formSchema>;

interface CaseOrderFormProps {
  initialData: CaseOrder | null;
  cases: Case[];
}

const CaseOrderForm: React.FC<CaseOrderFormProps> = ({
  initialData,
  cases,
}) => {
  const title = initialData ? "Edit case order" : "Create case order";
  const description = initialData
    ? "Edit this case order."
    : "Add a new case order";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? { ...initialData }
    : {
        label: "",
        slug: "",
        order: "",
        orderDate: undefined,
        caseId: "",
      };

  const form = useForm<CaseOrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const label = form.watch("label");

  useEffect(() => {
    const slugifiedLabel = slugify(label, { lower: true });
    form.setValue("slug", slugifiedLabel);
  }, [form, label]);

  const link = "/api/case-orders";
  const deleteLink = `/api/case-orders/${initialData?.slug}`;
  const refresh = "/dashboard/case-orders";

  const { mutate: mutate, isLoading } = useFormMutation<
    CaseOrderFormValues,
    CaseOrder
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
          onSubmit={form.handleSubmit((payload: CaseOrderFormValues) =>
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
              placeholder="Case order label"
            />
            <Input
              form={form}
              name="order"
              label="Order link"
              disabled={loading}
              placeholder="Case order link"
            />
            <Select form={form} label="Case" name="caseId" data={cases} />
            <DateInput form={form} name="orderDate" label="Order date" />
            <Button disabled={isLoading} className="ml-auto" type="submit">
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default CaseOrderForm;
