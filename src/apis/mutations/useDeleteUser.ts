import { useMutation } from "react-query";
import { isAxiosError } from "axios";

import api from "@/apis/client";

const fetcher = async () => {
  await api.delete("user/me");
};

const useDeleteUser = () => {
  const { mutate } = useMutation(fetcher, {
    onSuccess: () => {
      delete localStorage.TOKEN;
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

export default useDeleteUser;
