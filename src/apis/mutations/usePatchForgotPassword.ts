import { useMutation } from "react-query";
import { isAxiosError } from "axios";

import api from "@/apis/client";

interface Params {
  email: string;
  password: string;
  onSuccess: () => void;
}

const usePatchForgotPassword = (params: Params) => {
  const fetcher = async () => {
    await api.patch(`user/forgot/password`, params);
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

export default usePatchForgotPassword;
