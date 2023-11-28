import { useQuery } from "react-query";

import instance from "@/apis/client";
import { Postings } from "@/types/posting";

interface Props {
  politicalOrientationId?: number | null;
  categoryId?: number | null;
  page?: number;
  keyword?: string;
  startDate?: string;
  endDate?: string;
}

const usePostingHotQuery = (params?: Props) => {
  const url = "posting/hot";

  const fetcher = async () => {
    const { data } = await instance.get(url, { params });
    return data;
  };

  const { data } = useQuery<Postings>([url, params], fetcher, {
    cacheTime: 120000,
    staleTime: 60000,
  });

  return { hotPostings: data?.postings, hotTotal: data?.total };
};

export default usePostingHotQuery;
