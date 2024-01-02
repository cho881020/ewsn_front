import { useMutation } from "react-query";
import { isAxiosError } from "axios";

import api from "@/apis/client";

const usePatchHit = (id: number) => {
  const fetcher = async () => {
    await api.patch(`posting/${id}/hit`);
  };

  const { mutate } = useMutation(fetcher, {
    onError: (err) => {
      if (isAxiosError(err)) {
        console.log(err.response?.data.message);
      }
    },
  });

  return { mutate };
};

export default usePatchHit;
