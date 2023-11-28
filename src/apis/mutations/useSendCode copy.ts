import { useMutation } from "react-query";
import { isAxiosError } from "axios";

import { instance } from "@/apis/client";

interface Props {
  email: string;
  onSuccess: () => void;
}

const useSendCode = (params: Props) => {
  const fetcher = async () => {
    await instance.post("auth/sendCode", params);
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

export default useSendCode;
