"use client";

import { Tag } from "@prisma/client";
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
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import slugify from "slugify";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";

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
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const title = initialData ? "Edit tag" : "Create tag";
  const description = initialData ? "Edit this tag." : "Add a new tag";
  const toastMessage = initialData ? "Tag updated." : "Tag created.";
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

  const { mutate: tagMutation, isLoading } = useMutation({
    mutationFn: async (payload: TagFormValues) => {
      if (initialData) {
        const { data } = await axios.patch(
          `/api/tags/${params.tagSlug}`,
          payload
        );
        return data;
      } else {
        const { data } = await axios.post(`/api/tags`, payload);
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

  const {mutate: deleteTag, isLoading: loading} = useMutation({
    mutationFn: async () => {
        await axios.delete(`/api/tags/${params.tagSlug}`)
    },
    onSuccess: () => {
        router.push("/dashboard/tags");
        router.refresh();
        return toast({ title: "Tag deleted" });
    },
    onError: (err: any) => {
      return toast({ title: "Something went wrong.", variant: "destructive" });
    },
  })

  return (
    <div>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={deleteTag}
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
          onSubmit={form.handleSubmit((e) => tagMutation(e))}
          className="space-y-8 w-full"
        >
          <div className="flex flex-col gap-4">
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
                      placeholder="Tag name"
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
                      placeholder="Description of this tag"
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
export default TagForm;
