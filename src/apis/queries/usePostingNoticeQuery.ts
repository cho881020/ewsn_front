import { useQuery } from "react-query";

import instance from "@/apis/client";
import { Posting } from "@/types/posting";

interface Props {
  politicalOrientationId: number | null;
  categoryId: number | null;
}

const usePostingNoticeQuery = (params?: Props) => {
  const url = "posting/fix";

  const fetcher = async () => {
    if (params?.politicalOrientationId && params?.categoryId) {
      const { data } = await instance.get(url, { params });
      return data;
    }
  };

  const { data, isLoading } = useQuery<Posting[]>([url, params], fetcher);

  return { data, isLoading };
};

export default usePostingNoticeQuery;
