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

const fetcher = async (params: Params) => {
  await api.post("posting", params);
};

const usePosting = (onSuccess: () => void) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries(["posting"]);
      onSuccess();
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
