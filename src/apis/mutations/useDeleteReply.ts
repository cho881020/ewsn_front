import { useMutation, useQueryClient } from "react-query";
import { isAxiosError } from "axios";

import api from "@/apis/client";

const fetcher = async (id: number) => {
  await api.delete(`reply/${id}`);
};

const useDeleteReply = (postingId: number) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries([`posting/${postingId}/reply`]);
      queryClient.invalidateQueries([`posting/${postingId}`]);
      queryClient.invalidateQueries([`posting`]);
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        console.log(err.response?.data.message);
      }
    },
  });

  return { mutate };
};

export default useDeleteReply;
