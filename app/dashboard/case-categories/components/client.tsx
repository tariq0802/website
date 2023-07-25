"use client";

import { DataTable } from "@/components/data-table";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { CaseCategory } from "@prisma/client";
import { columns } from "./columns";

interface CaseCategoriesClientProps {
  data: CaseCategory[];
}

const CaseCategoriesClient: React.FC<CaseCategoriesClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Case categories: ${data.length}`}
          description="Manage Case categories here..."
        />
        <Button onClick={() => router.push(`/dashboard/case-categories/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <Separator />

      <DataTable searchKey="label" columns={columns} data={data} />
    </>
  );
};
export default CaseCategoriesClient;
