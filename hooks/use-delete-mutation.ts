import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

interface UseDeleteMutationOptions {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

const useDeleteMutation = (
  deleteLink: string,
  refresh: string,
  options?: UseDeleteMutationOptions
) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { mutate: deleteMutation, isLoading: loading } = useMutation({
    mutationFn: async () => {
      await axios.delete(deleteLink);
    },
    onSuccess: () => {
      setOpen(false);
      router.refresh();
      router.push(refresh);
      toast({ title: "Deleted!!!", description: "Delete request success" });
      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
    onError: (error: any) => {
      toast({ title: "Something went wrong.", variant: "destructive" });
      if (options?.onError) {
        options.onError(error);
      }
    },
  });
  return { deleteMutation, loading, open, setOpen };
};

export default useDeleteMutation;
