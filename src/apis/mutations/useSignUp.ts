import { useMutation } from "react-query";
import { isAxiosError } from "axios";

import { instance } from "@/apis/client";
import { SignUp } from "@/types/user";

const fetcher = async (params: SignUp) => {
  await instance.post("auth/signUp", params);
};

const useSignUp = ({ onSuccess }: { onSuccess: () => void }) => {
  const { mutate } = useMutation(fetcher, {
    onSuccess,
    onError: (err) => {
      if (isAxiosError(err)) {
        alert(err.response?.data.message);
      }
    },
  });

  return { mutate };
};

export default useSignUp;
