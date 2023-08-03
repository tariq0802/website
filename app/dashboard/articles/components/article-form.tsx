"use client";

import EditorJS from "@editorjs/editorjs";
import TextareaAutosize from "react-textarea-autosize";
import { Article, Case, Category, Recruitment, Tag } from "@prisma/client";
import { AlertModal } from "@/components/alert-modal";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Form, FormItem, FormLabel } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import slugify from "slugify";
import useFormMutation from "@/hooks/use-form-mutation";
import useDeleteMutation from "@/hooks/use-delete-mutation";
import Select from "@/components/select";
import TextArea from "@/components/text-area";
import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/image-upload";
import MultiSelect from "@/components/MultiSelect";
import { Session } from "next-auth";
import Input from "@/components/input";

const formSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  titleSlug: z.string().min(2),
  categoryId: z.string(),
  authorId: z.string(),
  description: z.string().nullable(),
  caseId: z.string().nullable(),
  recruitmentId: z.string().nullable(),
  image: z.string().nullable(),
  content: z.any(),
  tagIds: z.array(z.string()),
});

type ArticleFormValues = z.infer<typeof formSchema>;

interface ArticleFormProps {
  initialData:
    | (Article & {
        tags: Tag[];
      })
    | null;

  categories: Category[];
  cases: Case[];
  recruitments: Recruitment[];
  tags: Tag[];
  session: Session | null;
}

const ArticleForm: React.FC<ArticleFormProps> = ({
  initialData,
  categories,
  cases,
  recruitments,
  tags,
  session,
}) => {
  const [imageSrc, setImageSrc] = useState(initialData?.image || "");
  const formTitle = initialData ? "Edit article" : "Create article";
  const formDescription = initialData ? "Edit article." : "Add new article";
  const action = initialData ? "Save changes" : "Create";
  const link = "/api/articles";
  const deleteLink = `/api/articles/${initialData?.slug}`;
  const refresh = "/dashboard/articles";

  const ref = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const defaultValues = initialData
    ? {
        ...initialData,
        tagIds: initialData.tags?.map((tag: any) => tag.id) || [],
      }
    : {
        title: "",
        titleSlug: "",
        slug: "",
        categoryId: "",
        authorId: session?.user.id,
        description: "",
        caseId: "",
        recruitmentId: "",
        image: "",
        content: null,
        tagIds: [],
      };

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const titleSlug = form.watch("titleSlug");
  const selectedCategory = form.watch("categoryId");

  useEffect(() => {
    const slugifiedLabel = slugify(titleSlug, { lower: true });
    form.setValue("slug", slugifiedLabel);
    form.setValue("image", imageSrc);
  }, [form, imageSrc, titleSlug]);

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const Quote = (await import("@editorjs/quote")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type post content here...",
        inlineToolbar: true,
        data: initialData?.content as any || { blocks: [] },
        tools: {
          header: Header,
          list: List,
          quote: Quote,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
          code: Code,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
        },
      });
    }
  }, [initialData?.content]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);
  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef?.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  const { ref: titleRef, ...rest } = form.register("title");

  const { mutate: mutate, isLoading } = useFormMutation<
    ArticleFormValues,
    Article
  >(link, initialData as any, refresh);

  const { deleteMutation, loading, open, setOpen } = useDeleteMutation(
    deleteLink,
    refresh,
    imageSrc
  );

  const onSubmit = async (payload: ArticleFormValues) => {
    const savedContent = await ref.current?.save();
    const updatedPayload = { ...payload, content: savedContent };
    mutate(updatedPayload);
  };

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
          onSubmit={form.handleSubmit(onSubmit)}
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
            <Select
              form={form}
              label="Category"
              name="categoryId"
              data={categories}
            />
            {selectedCategory === "clkk59bsm0007rvrsn6v7u36y" ? (
              <Select form={form} label="Case No" name="caseId" data={cases} />
            ) : null}
            {selectedCategory === "clkk59xej0008rvrsray3qimk" ? (
              <Select
                form={form}
                label="Recruitment"
                name="recruitmentId"
                data={recruitments}
              />
            ) : null}
            <MultiSelect form={form} label="Tags" name="tagIds" data={tags} />
            <Input
              disabled={isLoading}
              form={form}
              name="titleSlug"
              label="Slug"
              placeholder="Write title in english"
            />
            <TextArea
              form={form}
              label="Description"
              name="description"
              disabled={loading}
              placeholder="Article description"
            />
            <div className="mt-6 space-y-2">
              <Label>Content</Label>
              <div className="prose prose-stone dark:prose-invert bg-slate-50 rounded p-4 sm:p-6 border-[1px]">
                <TextareaAutosize
                  ref={titleRef}
                  {...rest}
                  placeholder="Title"
                  className="w-full resize-none appearance-none overflow-hidden bg-transparent text-2xl font-bold focus:outline-none text-slate-600 editorContent"
                />
                <div
                  id="editor"
                  className="min-h-[500px] text-slate-600 editorContent"
                />
              </div>
            </div>
            <Button disabled={isLoading} className="ml-auto" type="submit">
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default ArticleForm;
