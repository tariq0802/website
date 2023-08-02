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
  imageLink: string,
  options?: UseDeleteMutationOptions
) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { mutate: deleteMutation, isLoading: loading } = useMutation({
    mutationFn: async () => {
      if (imageLink) {
        try {
          const response = await axios.delete("/api/upload", {
            data: { imageUrl: imageLink },
          });
          if (response.status === 200) {
            toast({
              title: "Image deleted",
              description: "The image has been successfully deleted.",
            });
          } else {
            toast({ title: "Error deleting image", variant: "destructive" });
          }
        } catch (error) {
          toast({ title: "Error deleting image", variant: "destructive" });
        }
      }
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
