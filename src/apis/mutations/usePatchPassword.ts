import { useMutation } from "react-query";
import { isAxiosError } from "axios";

import api from "@/apis/client";

interface Params {
  currentPassword: string;
  updatePassword: string;
  onSuccess: () => void;
}

const usePatchPassword = (params: Params) => {
  const fetcher = async () => {
    await api.patch(`user/me/password`, params);
  };

  const { mutate } = useMutation(fetcher, {
    onSuccess: () => {
      params.onSuccess();
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        alert(err.response?.data.message);
      }
    },
  });

  return { mutate };
};

export default usePatchPassword;
