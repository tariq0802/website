"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatTimeToNow } from "@/lib/utils";
import { RecruitmentBoard } from "@prisma/client";
import CellAction from "./cell-action";

export const columns: ColumnDef<RecruitmentBoard>[] = [
  {
    accessorKey: "label",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: (info) => formatTimeToNow(info.row.original.createdAt),
  },
  {
    accessorKey: "website",
    header: "Website",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
