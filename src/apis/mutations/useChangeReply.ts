import { useMutation, useQueryClient } from "react-query";
import { isAxiosError } from "axios";

import api from "@/apis/client";

interface ReplyParams {
  content: string;
  id: number;
}

const fetcher = async (params: ReplyParams) => {
  await api.put(`reply/${params.id}`, params);
};

const useChangeReply = (postingId: number) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries([`posting/${postingId}/reply`]);
      queryClient.invalidateQueries([`posting/${postingId}`]);
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        console.log(err.response?.data.message);
      }
    },
  });

  return { mutate };
};

export default useChangeReply;
