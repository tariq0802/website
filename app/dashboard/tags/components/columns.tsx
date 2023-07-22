"use client";

import { Tag } from "@prisma/client";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { DateTime } from "luxon";

export const columns: ColumnDef<Tag, any>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Creation date",
    cell: (info: CellContext<Tag, Date>) => {
      const createdAtDate = info.getValue() as Date;
      return DateTime.fromJSDate(createdAtDate).toFormat("dd LLL yyyy");
    },
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
