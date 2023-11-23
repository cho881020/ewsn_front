import { useQuery } from "react-query";

import instance from "@/apis/client";
import { Replies } from "@/types/posting";

interface Reply {
  bestReplies: Replies[];
  replies: Replies[];
}

const useReplyQuery = (id: number) => {
  const url = `posting/${id}/reply`;

  const fetcher = async () => {
    const { data } = await instance.get(url);
    return data;
  };

  const { data } = useQuery<Reply>([url, id], fetcher);

  return { bestReplies: data?.bestReplies, replies: data?.replies };
};

export default useReplyQuery;
