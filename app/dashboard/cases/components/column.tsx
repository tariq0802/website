import { formatTimeToNow } from "@/lib/utils";
import { CaseCategory } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type CaseColumn = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  caseNo: string;
  petitioner: string;
  respondent: string;
  casefile: string | null;
  createdAt: Date;
  caseCategoryId: string;
  caseCategory: CaseCategory
};

export const columns: ColumnDef<CaseColumn>[] = [
  {
    accessorKey: "title",
    header: "Cause title",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: (info) => formatTimeToNow(info.row.original.createdAt),
  },
  {
    accessorKey: "casefile",
    header: "Case file",
  },
  {
    accessorKey: "caseCategory",
    header: "Category",
    cell: ({ row }) => row.original.caseCategory.label,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];