import { useQuery } from "react-query";

import instance from "@/apis/client";
import { Ad } from "@/types/ad";

const useAdsQuery = () => {
  const url = "ad";

  const fetcher = async () => {
    const { data } = await instance.get(url);
    return data;
  };

  const { data: ads } = useQuery<Ad[]>([url], fetcher);

  return { ads };
};

export default useAdsQuery;
