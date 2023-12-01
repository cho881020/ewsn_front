import { useQuery } from "react-query";

import instance from "@/apis/client";
import { Posting } from "@/types/posting";

interface Props {
  politicalOrientationId: number | null;
}

const usePostingNoticeQuery = (params?: Props) => {
  const url = "posting/notice";

  const fetcher = async () => {
    if (params?.politicalOrientationId) {
      const { data } = await instance.get(url, { params });
      return data;
    }
  };

  const { data } = useQuery<Posting[]>([url, params], fetcher, {
    cacheTime: 120000,
    staleTime: 60000,
  });

  return { notice: data };
};

export default usePostingNoticeQuery;
