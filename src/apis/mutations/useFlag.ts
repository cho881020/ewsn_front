import { useMutation } from "react-query";
import { isAxiosError } from "axios";

import api from "@/apis/client";

interface Params {
  purpose: string;
  name: string;
  term: string;
  numberOfPeople: number;
  content: string;
  materials: string;
  isPermitted: string;
  phoneNumber: string;
  email: string;
}

const fetcher = async (params: Params) => {
  await api.post("flag", params);
};

const useFlag = (onSuccess: () => void) => {
  const { mutate } = useMutation(fetcher, {
    onSuccess: () => {
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

export default useFlag;
