import { useMutation, useQueryClient } from "react-query";
import { isAxiosError } from "axios";

import api from "@/apis/client";

interface Props {
  id: number;
  onSuccess: () => void;
}

const useDeletePosting = ({ id, onSuccess }: Props) => {
  const queryClient = useQueryClient();
  const fetcher = async () => {
    await api.delete(`posting/${id}`);
  };

  const { mutate } = useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries([`posting`]);
      queryClient.invalidateQueries([`posting/notice`]);
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

export default useDeletePosting;
