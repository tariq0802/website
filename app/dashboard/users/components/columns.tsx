"use client";

import { Account, Role } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { formatTimeToNow } from "@/lib/utils";
import MyImage from "@/components/image";
import Image from "next/image";
import CellAction from "./cell-action";

export type UserColumn = {
  id: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
  accounts?: Account[] | null;
};

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "image",
    header: "Photo",
    cell: ({ row }) => (
      <div className="relative w-14 h-14">
        {row.original.accounts && row.original.accounts.length === 0 ? (
          <MyImage src={row.original.image} alt="Image" fill />
        ) : (
          <Image
            src={row.original.image || "/images/placeholder.jpg"}
            alt="Image"
            fill
          />
        )}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Creation date",
    cell: (info) => formatTimeToNow(info.row.original.createdAt),
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
