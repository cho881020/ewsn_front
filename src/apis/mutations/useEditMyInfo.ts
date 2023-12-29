import { useMutation, useQueryClient } from "react-query";
import { isAxiosError } from "axios";

import api from "@/apis/client";

interface EditParams {
  nickName: string;
  phoneNumber: string;
}

const useEditMyInfo = (params: EditParams) => {
  const queryClient = useQueryClient();
  const fetcher = async () => {
    await api.put("user/me", params);
  };

  const { mutate } = useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user/me"]);
      window.location.href = "/";
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        console.log(err.response?.data.message);
      }
    },
  });

  return { mutate };
};

export default useEditMyInfo;
