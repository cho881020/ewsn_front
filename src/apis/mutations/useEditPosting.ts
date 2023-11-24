import { useMutation, useQueryClient } from "react-query";
import { isAxiosError } from "axios";

import api from "@/apis/client";

interface Props {
  id: number;
  title: string;
  content: string;
  categoryId: number;
  isFixed: boolean;
  onSuccess: () => void;
}

const useEditPosting = (props: Props) => {
  const { onSuccess, id, ...params } = props;
  const queryClient = useQueryClient();

  const fetcher = async () => {
    await api.put(`posting/${id}`, params);
  };

  const { mutate } = useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries([`posting/${id}`]);
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

export default useEditPosting;
