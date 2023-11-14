import { useMutation } from "react-query";

import { instance } from "@/apis/client";

interface NickNameParams {
  nickName: string;
}

const fetcher = async (params: NickNameParams) => {
  await instance.post("auth/checkNickName", params);
};

const useCheckNickName = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const { mutate } = useMutation(fetcher, {
    onSuccess,
    onError,
  });

  return { mutate };
};

export default useCheckNickName;
