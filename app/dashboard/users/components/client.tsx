"use client";

import { DataTable } from "@/components/data-table";
import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { UserColumn, columns } from "./columns";

interface UsersClientProps {
  data: UserColumn[] ;
}

const UsersClient: React.FC<UsersClientProps> = ({ data }) => {

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Uaers: ${data.length}`}
          description="Manage Tags here..."
        />
      </div>

      <Separator />

      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
export default UsersClient;
