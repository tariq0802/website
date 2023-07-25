"use client";

import { DataTable } from "@/components/data-table";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { CaseColumn, columns } from "./column";

interface CasesClientProps {
  data: CaseColumn[];
}

const CasesClient: React.FC<CasesClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Cases: ${data.length}`}
          description="Manage Cases here..."
        />
        <Button onClick={() => router.push(`/dashboard/cases/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <Separator />

      <DataTable searchKey="title" columns={columns} data={data} />
    </>
  );
};
export default CasesClient;
