"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CategoryColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { AlertModal } from "@/components/alert-modal";
import { useMutation } from "@tanstack/react-query";

interface CellActionProps {
  data: CategoryColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { mutate: deleteCategory, isLoading: loading } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/tags/${data.slug}`);
    },
    onSuccess: () => {
      router.push("/dashboard/tags");
      router.refresh();
      return toast({
        title: "Success!!!",
        description: "Category deleted.",
        variant: "default",
      });
    },
    onError: (err: any) => {
      return toast({
        title: "Something went wrong",
        description:
          "Make sure you removed all products using this category first.",
        variant: "destructive",
      });
    },
  });

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      title: "Success!!!",
      description: "Category ID copied to clipboard.",
      variant: "default",
    });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={deleteCategory}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" /> Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/categories/${data.slug}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
