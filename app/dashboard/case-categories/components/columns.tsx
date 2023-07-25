"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatTimeToNow } from "@/lib/utils";
import { CaseCategory } from "@prisma/client";
import CellAction from "./cell-action";

export const columns: ColumnDef<CaseCategory>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Creation date",
    cell: (info) => formatTimeToNow(info.row.original.createdAt),
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
