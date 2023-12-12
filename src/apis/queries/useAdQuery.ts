import { useQuery } from "react-query";

import instance from "@/apis/client";
import { Ad } from "@/types/ad";

const useAdQuery = (id: number) => {
  const url = `ad/${id}`;

  const fetcher = async () => {
    const { data } = await instance.get(url);
    return data;
  };

  const { data } = useQuery<Ad>([url], fetcher);

  return data;
};

export default useAdQuery;
