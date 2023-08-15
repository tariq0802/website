"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import slugify from "slugify";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Tag } from "@prisma/client";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  label: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
});

type TagFormValues = z.infer<typeof formSchema>;

interface CreateTagProps {
  open: boolean;
  onClose: () => void;
}

const CreateTag: React.FC<CreateTagProps> = ({ open, onClose }) => {
  const router = useRouter();
  const defaultValues = {
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
  }, [form, label]);

  const { mutate: createTag, isLoading } = useMutation<
    Tag,
    AxiosError,
    TagFormValues
  >({
    mutationFn: async (formdata) => {
      const { data } = await axios.post("/api/tags", formdata);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Tag already exist.",
            description: "Please choose a different label.",
            variant: "destructive",
          });
        }
        if (err.response?.status === 422) {
          return toast({
            title: "Inavalid name.",
            description: "Please choose a name between 3 to 21 characters.",
            variant: "destructive",
          });
        }
      }
      toast({
        title: "There was an error.",
        description: "Could not create Tag.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      router.refresh();
      onClose();
    },
  });

  const onSubmit = async (formData: TagFormValues) => {
    await createTag(formData);
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Tag</DialogTitle>
          <DialogDescription>
            Make sure to create tag in english language.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="flex flex-col gap-4 pt-8">
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 gap-6">
                    <Label className="col-span-1 text-end">Label</Label>
                    <FormControl className="col-span-3">
                      <Input
                        disabled={isLoading}
                        placeholder="Write tag name"
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
                  <>
                    <FormItem className="grid grid-cols-4 gap-6">
                      <Label className="col-span-1 text-end">Description</Label>
                      <FormControl className="col-span-3">
                        <Textarea
                          disabled={isLoading}
                          placeholder="Description"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage />
                  </>
                )}
              />
              <Button
                disabled={isLoading}
                className="ml-auto"
                type="submit"
                size="sm"
              >
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTag;
