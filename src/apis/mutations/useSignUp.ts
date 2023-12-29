import { useMutation } from "react-query";
import { isAxiosError } from "axios";

import { instance } from "@/apis/client";

interface SignUpParams {
  email: string;
  password: string;
  nickName: string;
  name: string;
  phoneNumber: string;
  gender: string;
  politicalOrientationId: number;
}

const fetcher = async (params: SignUpParams) => {
  await instance.post("auth/signUp", params);
};

const useSignUp = () => {
  const { mutate } = useMutation(fetcher, {
    onSuccess: () => {
      window.location.href = "/";
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        alert(err.response?.data.message);
      }
    },
  });

  return { mutate };
};

export default useSignUp;
