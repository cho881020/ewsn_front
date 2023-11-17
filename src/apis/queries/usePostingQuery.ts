import { useQuery } from "react-query";

import instance from "@/apis/client";
import Posting from "@/types/posting";

interface Props {
  politicalOrientationId?: number;
  categoryId?: number;
  page?: number;
  keyword?: string;
}

const usePostingQuery = (params?: Props) => {
  const url = "posting";

  const fetcher = async () => {
    const { data } = await instance.get(url, { params });
    return data;
  };

  const { data } = useQuery<Posting>([url, params], fetcher, {
    cacheTime: 120000,
    staleTime: 60000,
  });

  return { postings: data?.postings, total: data?.total };
};

export default usePostingQuery;
