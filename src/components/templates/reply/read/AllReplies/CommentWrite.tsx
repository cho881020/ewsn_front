import Image from "next/image";
import { useState } from "react";
import { useRecoilValue } from "recoil";

import useReply from "@/apis/mutations/useReply";
import { Posting } from "@/types/posting";
import authState from "@/stores/authState";

import comment from "@/assets/reply/comment.png";

import { Btn } from "@/ui/buttons";
import Textarea from "@/ui/textarea";
import { Content } from "@/ui/fonts";
import COLORS, { CAMP_COLORS } from "@/ui/colors";
import { Color, Info, Item } from "@/components/atoms/reply";

interface Props {
  post: Posting;
  replyId: number;
  closeOpenComment: () => void;
}

const CommentWrite = ({ post, replyId, closeOpenComment }: Props) => {
  const { id, politicalOrientationId, isAdmin, nickName } =
    useRecoilValue(authState);

  const [newComment, setNewComment] = useState("");

  const { mutate } = useReply(post.id);

  const postComment = () => {
    if (!id) return alert("비회원은 대댓글을 작성할 수 없습니다.");
    if (
      !isAdmin &&
      post.politicalOrientationId !== 5 &&
      politicalOrientationId !== post.politicalOrientationId
    ) {
      return alert("다른 진영의 글에는 대댓글을 달 수 없습니다.");
    }
    mutate({ postingId: post.id, content: newComment, replyId });
    closeOpenComment();
    setNewComment("");
  };

  const enterKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        e.preventDefault();
        postComment();
      }
    }
  };

  return (
    <Item padding="12px 20px" bg={COLORS.BG}>
      <Info>
        <div className="flex gap-2 items-center">
          <Image src={comment} alt="comment" />
          <Color $color={CAMP_COLORS[politicalOrientationId - 1].color} />
          <Content level="body1" color={COLORS.TEXT02}>
            {nickName}
          </Content>
        </div>
      </Info>
      <Textarea
        placeholder="타인을 배려하는 마음을 담아 댓글을 작성해 주세요."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        height="120px"
        className="mb-4"
        onKeyDown={enterKeyPress}
      />
      <div className="flex justify-end ">
        <Btn $small width="52px" height="32px" onClick={postComment}>
          등록
        </Btn>
      </div>
    </Item>
  );
};

export default CommentWrite;
