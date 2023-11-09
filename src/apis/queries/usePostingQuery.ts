import { useQuery } from "react-query";

import instance from "@/apis/client";
import Posting from "@/types/posting";

interface Props {
  politicalOrientationId?: number;
  categoryId?: number;
  page?: number;
  range?: string;
  item?: string;
}

const usePostingQuery = (params?: Props) => {
  const url = "posting";

  const fetcher = async () => {
    const { data } = await instance.get(url, { params });
    return data;
  };

  const { data: postings } = useQuery<Posting[]>([url, params], fetcher);

  return { postings };
};

export default usePostingQuery;
