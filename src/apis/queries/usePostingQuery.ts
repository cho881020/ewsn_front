import { useQuery } from "react-query";

import instance from "@/apis/client";
import { Postings } from "@/types/posting";

interface Props {
  politicalOrientationId?: number | null;
  categoryId?: number | null;
  page?: number;
  keyword?: string;
}

const usePostingQuery = (params?: Props) => {
  const url = "posting";

  const fetcher = async () => {
    const { data } = await instance.get(url, { params });
    return data;
  };

  const { data } = useQuery<Postings>([url, params], fetcher);

  return { postings: data?.postings, total: data?.total };
};

export default usePostingQuery;
