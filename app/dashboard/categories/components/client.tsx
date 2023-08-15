"use client";

import { DataTable } from "@/components/data-table";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { CategoryColumn, columns } from "./columns";

interface categoriesClientProps {
  data: CategoryColumn[];
}

const CategoriesClient: React.FC<categoriesClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories: ${data.length}`}
          description="Manage categories for your store"
        />
        <Button onClick={() => router.push(`/dashboard/categories/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <Separator />

      <DataTable searchKey="label" columns={columns} data={data} />
    </>
  );
};

export default CategoriesClient;
