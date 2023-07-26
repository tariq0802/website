"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { RecruitmentBoard } from "@prisma/client";
import CellAction from "./cell-action";

export type RecruitmentColumn = {
  id: string;
  label: string;
  slug: string;
  description: string | null;
  vacancy: string | null;
  lastDate: Date | null;
  salary: string | null;
  qualification: string | null;
  createdAt: Date;
  updatedAt: Date;
  recruitmentBoardId: string;
  recruitmentBoard: RecruitmentBoard
};

export const columns: ColumnDef<RecruitmentColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "recruitmentBoardLabel",
    header: "Authority",
    cell: (info) => info.row.original.recruitmentBoard.label,
  },
  {
    accessorKey: "vacancy",
    header: "Vacancy",
  },
  {
    accessorKey: "lastDate",
    header: "Last date",
    cell: ({ row }) =>  format(row.original.lastDate || new Date(0), "PPP"),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
