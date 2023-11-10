import { useQuery } from "react-query";

import instance from "@/apis/client";
import Posting from "@/types/posting";

const usePostQuery = (id: number) => {
  const fetcher = async () => {
    const { data } = await instance.get(`posting/${id}`);
    return data;
  };

  const { data: post } = useQuery<Posting[]>([`posting/${id}`, id], fetcher);

  return { post };
};

export default usePostQuery;
