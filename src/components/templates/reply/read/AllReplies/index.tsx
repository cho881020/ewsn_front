import { useState } from "react";
import styled from "styled-components";

import { Posting, Replies } from "@/types/posting";

import COLORS from "@/ui/colors";
import Reply from "@/components/templates/reply/read/AllReplies/Reply";
import Comment from "@/components/templates/reply/read/AllReplies/Comment";
import CommentWrite from "@/components/templates/reply/read/AllReplies/CommentWrite";

interface Props {
  replies: Replies[];
  post: Posting;
}

const AllReplies = ({ replies, post }: Props) => {
  const [isOpenComment, setIsOpenComment] = useState(-1);

  return (
    <Container>
      {replies.map((reply) => (
        <div key={reply.id}>
          <Reply
            post={post}
            reply={reply}
            isOpenComment={isOpenComment}
            onChangeOpenComment={(e: number) => setIsOpenComment(e)}
          />
          {isOpenComment === reply.id && (
            <CommentWrite
              post={post}
              replyId={reply.id}
              closeOpenComment={() => setIsOpenComment(-1)}
            />
          )}
          {reply.comments?.map((comment) => (
            <Comment key={comment.id} post={post} data={comment} />
          ))}
        </div>
      ))}
    </Container>
  );
};

const Container = styled.div`
  border-top: 1px solid ${COLORS.LINE03};
  width: 100%;
  margin-bottom: 40px;
`;

export default AllReplies;
