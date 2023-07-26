"use client"

import { DataTable } from "@/components/data-table";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { RecruitmentColumn, columns } from "./columns";

interface RecruitmentClientProps {
    data: RecruitmentColumn[]
}

const RecruitmentsClient: React.FC<RecruitmentClientProps> = ({data}) => {
    const router = useRouter();

    return (
      <>
        <div className="flex items-center justify-between">
          <Heading
            title={`Recruitments: ${data.length}`}
            description="Manage recruitments here..."
          />
          <Button onClick={() => router.push(`/dashboard/recruitments/new`)}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>

        <Separator />

        <DataTable searchKey="label" columns={columns} data={data} />
      </>
    );
}

export default RecruitmentsClient;