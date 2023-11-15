import { useQuery } from "react-query";

import instance from "@/apis/client";

const useMeQuery = () => {
  const url = "user/me";

  const fetcher = async () => {
    const { data } = await instance.get(url);
    return data;
  };

  const { data: myInfo } = useQuery([url], fetcher);

  return { myInfo };
};

export default useMeQuery;
