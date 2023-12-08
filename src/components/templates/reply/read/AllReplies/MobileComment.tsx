import Image from "next/image";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import useChangeReply from "@/apis/mutations/useChangeReply";
import useDeleteReply from "@/apis/mutations/useDeleteReply";
import { Posting, Replies } from "@/types/posting";
import authState from "@/stores/authState";
import { getDateTimeSecond } from "@/utils/getDate";

import comment from "@/assets/reply/comment.png";

import { Btn } from "@/ui/buttons";
import Textarea from "@/ui/textarea";
import { Content } from "@/ui/fonts";
import COLORS, { CAMP_COLORS } from "@/ui/colors";
import { Color, Info, Item } from "@/components/atoms/reply";
import ModalDelete from "@/components/organisms/ModalDelete";
import Recommend from "@/components/templates/reply/read/Recommend";
import Report from "@/components/templates/reply/read/AllReplies/Report";

const MobileComment = ({ data, post }: { data: Replies; post: Posting }) => {
  const { id } = useRecoilValue(authState);
  const { user, createdAt, content, postingId, userPoliticalOrientationId } =
    data;
  const [newComment, setNewComment] = useState(content);
  const [isChangeComment, setIsChangeComment] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const { mutate } = useChangeReply(postingId);
  const { mutate: deleteMutate } = useDeleteReply(postingId);

  const changeComment = () => {
    mutate({ content: newComment, id: data.id });
    setIsChangeComment(false);
  };

  const onChangeOpenComment = () => {
    if (isChangeComment === true) {
      setIsChangeComment(false);
    } else {
      setIsChangeComment(true);
    }
    setNewComment(content);
  };

  const enterKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        e.preventDefault();
        changeComment();
      }
    }
  };

  return (
    <Container padding="12px 20px" bg={user.id === id ? COLORS.BG : "#fff"}>
      <Info>
        <div className="flex gap-2 items-center">
          <Image src={comment} alt="comment" />
          <Color $color={CAMP_COLORS[userPoliticalOrientationId - 1]?.color} />
          <Content level="body1" color={COLORS.TEXT02}>
            {user.nickName}
          </Content>
        </div>
        <Recommend reply={data} post={post} />
      </Info>
      {isChangeComment ? (
        <>
          <Textarea
            placeholder="타인을 배려하는 마음을 담아 댓글을 작성해 주세요."
            value={newComment}
            height="120px"
            className="mb-4"
            onKeyDown={enterKeyPress}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex justify-end ">
            <Btn $small width="52px" height="32px" onClick={changeComment}>
              등록
            </Btn>
          </div>
        </>
      ) : (
        <CustomContent level="body1l">{content}</CustomContent>
      )}
      <div className="flex gap-3 mt-3">
        <Content level="cap2" color={COLORS.TEXT05}>
          {getDateTimeSecond(createdAt)}
        </Content>
        {id === user.id ? (
          <>
            <Content
              level="cap2"
              color={COLORS.TEXT04}
              className="cursor-pointer"
              onClick={onChangeOpenComment}
            >
              수정
            </Content>
            <Content
              level="cap2"
              color={COLORS.TEXT04}
              className="cursor-pointer"
              onClick={() => setIsOpenDeleteModal(true)}
            >
              삭제
            </Content>
            {isOpenDeleteModal && (
              <ModalDelete
                title="댓글"
                onClose={() => setIsOpenDeleteModal(false)}
                onDelete={() => deleteMutate(data.id)}
              />
            )}
          </>
        ) : (
          <Report
            replyId={data.id}
            politicalOrientation={post.politicalOrientationId}
          />
        )}
      </div>
    </Container>
  );
};

const Container = styled(Item)`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const CustomContent = styled(Content)`
  width: 100%;
  white-space: pre-line;
  word-break: break-all;
`;

export default MobileComment;
