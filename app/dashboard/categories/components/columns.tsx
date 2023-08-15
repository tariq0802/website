"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { formatTimeToNow } from "@/lib/utils";
import Image from "next/image";
import { Category } from "@prisma/client";

export type CategoryColumn = {
  id: string;
  slug: string;
  label: string;
  createdAt: Date;
  image: string | null;
  description: string | null;
  parentId: string | null;
  parent: Category | null;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="relative w-20 h-14">
        {row.original.image && (
          <Image src={row.original.image} alt="Category Image" fill />
        )}
      </div>
    ),
  },
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "parent",
    header: "Parent",
    cell: ({ row }) => row.original.parent?.label,
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: (info) => formatTimeToNow(info.row.original.createdAt),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
