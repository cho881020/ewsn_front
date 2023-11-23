import { useMutation, useQueryClient } from "react-query";
import { isAxiosError } from "axios";

import api from "@/apis/client";

interface ReplyParams {
  id: number;
  likeType: string;
}

const fetcher = async (params: ReplyParams) => {
  await api.patch(`posting/${params.id}/likeType`, params);
};

const usePatchRecommend = (id: number) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries([`posting/${id}`]);
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        console.log(err.response?.data.message);
      }
    },
  });

  return { mutate };
};

export default usePatchRecommend;
