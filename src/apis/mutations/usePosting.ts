import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";
import { isAxiosError } from "axios";

import api from "@/apis/client";

interface Params {
  title: string;
  content: string;
  categoryId: number;
  politicalOrientationId: number;
  isFixed: boolean;
}

const usePosting = (params: Params) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const fetcher = async () => {
    const result = await api.post("posting", params);
    return result;
  };

  const { mutate } = useMutation(fetcher, {
    onSuccess: (result) => {
      queryClient.invalidateQueries(["posting"]);
      queryClient.invalidateQueries(["posting/notice"]);
      router.push(
        `post/${result.data.id}?camp=${params.politicalOrientationId}&category=${params.categoryId}`
      );
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        console.log(err.response?.data.message);
      }
    },
  });

  return { mutate };
};

export default usePosting;
