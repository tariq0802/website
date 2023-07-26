"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatTimeToNow } from "@/lib/utils";
import { format } from "date-fns";
import CellAction from "./cell action";
import { Case } from "@prisma/client";

export type OrderColumn = {
  id: string;
  label: string;
  slug: string;
  order: string;
  orderDate: Date;
  caseId: string;
  createdAt: Date;
  case: Case;
};
export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: (info) => formatTimeToNow(info.row.original.createdAt),
  },
  {
    accessorKey: "order",
    header: "Link",
  },
  {
    accessorKey: "orderDate",
    header: "Order date",
    cell: ({row}) => format(row.original.orderDate, "PPP")
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
