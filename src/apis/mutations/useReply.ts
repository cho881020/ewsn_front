import { useMutation, useQueryClient } from "react-query";
import { isAxiosError } from "axios";

import api from "@/apis/client";

interface ReplyParams {
  postingId: number;
  content: string;
  replyId?: number;
}

const fetcher = async (params: ReplyParams) => {
  await api.post("reply", params);
};

const useReply = (postingId: number) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries([`posting/${postingId}/reply`]);
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        console.log(err.response?.data.message);
      }
    },
  });

  return { mutate };
};

export default useReply;
