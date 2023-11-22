import Write from "@/components/templates/reply/Write";
import Read from "@/components/templates/reply/read";
import { Posting, Replies } from "@/types/posting";

interface Props {
  post: Posting;
  replies: Replies[];
  bestReplies: Replies[];
}

const Reply = ({ post, replies, bestReplies }: Props) => {
  return (
    <>
      <Write post={post} />
      <Read replies={replies} bestReplies={bestReplies} />
    </>
  );
};

export default Reply;
