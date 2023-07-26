"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Category, Prisma, User } from "@prisma/client";
import CellAction from "./cell-action";
import { formatTimeToNow } from "@/lib/utils";

export type ArticleColumn = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  image: string | null;
  content: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  categoryId: string;
  caseId: string | null;
  recruitmentId: string | null;
  author: User
  category: Category
};

export const columns: ColumnDef<ArticleColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "label",
    header: "Category",
    cell: (info) => info.row.original.category.label,
  },
  {
    accessorKey: "name",
    header: "Author",
    cell: (info) => info.row.original.author.name,
  },
  {
    accessorKey: "createAt",
    header: "Created",
    cell: ({ row }) => formatTimeToNow(row.original.createdAt),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
