import { useQuery } from "react-query";

import instance from "@/apis/client";
import { Posting } from "@/types/posting";

interface Post {
  posting: Posting;
  likeCounts: {
    likes: number;
    disLikes: number;
  };
}
const usePostQuery = (id: number) => {
  const fetcher = async () => {
    const { data } = await instance.get(`posting/${id}`);
    return data;
  };

  const { data } = useQuery<Post>([`posting/${id}`, id], fetcher);

  return { posting: data?.posting, likeCounts: data?.likeCounts };
};

export default usePostQuery;
