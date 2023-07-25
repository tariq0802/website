"use client";

import { DataTable } from "@/components/data-table";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { RecruitmentBoard } from "@prisma/client";
import { columns } from "./column";

interface TagsClientProps {
  data: RecruitmentBoard[];
}

const AuthorityClient: React.FC<TagsClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Recruitment Autorities: ${data.length}`}
          description="Manage authorities here..."
        />
        <Button onClick={() => router.push(`/dashboard/authorities/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <Separator />

      <DataTable searchKey="label" columns={columns} data={data} />
    </>
  );
};
export default AuthorityClient;
