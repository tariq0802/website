"use client";

import { DataTable } from "@/components/data-table";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { OrderColumn, columns } from "./columns";

interface CaseOrdersClientProps {
  data: OrderColumn[]
}

const CaseOrdersClient: React.FC<CaseOrdersClientProps> = ({
  data,
}) => {
  const router = useRouter();
  

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Case orders: ${data.length}`}
          description="Manage Case orders here..."
        />
        <Button onClick={() => router.push(`/dashboard/case-orders/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <Separator />

      <DataTable searchKey="label" columns={columns} data={data} />
    </>
  );
};
export default CaseOrdersClient;
