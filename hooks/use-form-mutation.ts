import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "./use-toast";
import { useRouter } from "next/navigation";

const useFormMutation = <T, R>(
  link: string,
  initialData: T | null,
  refresh: string
) => {
  const router = useRouter();

  return useMutation<R, unknown, T>(
    async (payload: T) => {
      if (initialData) {
        const { data } = await axios.patch<R>(
          `${link}/${(initialData as any).slug}`,
          payload
        );
        return data;
      } else {
        const { data } = await axios.post<R>(link, payload);
        return data;
      }
    },
    {
      onError: (err: any) => {
        return toast({
          title: "Request Failed!!!",
          description: "Something went wrong.",
          variant: "destructive",
        });
      },
      onSuccess: () => {
        router.push(refresh);
        router.refresh();
        return toast({
          title: "Success!!!",
          description: "Request Submitted successfully.",
        });
      },
    }
  );
};

export default useFormMutation;
