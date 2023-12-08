import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import useChangeReply from "@/apis/mutations/useChangeReply";
import useDeleteReply from "@/apis/mutations/useDeleteReply";
import { Posting, Replies } from "@/types/posting";
import authState from "@/stores/authState";
import { getDateTimeSecond } from "@/utils/getDate";

import { Btn } from "@/ui/buttons";
import Textarea from "@/ui/textarea";
import { Content } from "@/ui/fonts";
import COLORS, { CAMP_COLORS } from "@/ui/colors";
import { Color, Info, Item } from "@/components/atoms/reply";
import ModalDelete from "@/components/organisms/ModalDelete";
import Recommend from "@/components/templates/reply/read/Recommend";
import Report from "@/components/templates/reply/read/AllReplies/Report";

interface Props {
  post: Posting;
  reply: Replies;
  isOpenComment: number;
  onChangeOpenComment: (e: number) => void;
}

const MobileReply = ({
  reply,
  isOpenComment,
  onChangeOpenComment,
  post,
}: Props) => {
  const { user, createdAt, content, postingId, userPoliticalOrientationId } =
    reply;
  const { id, isAdmin, politicalOrientationId } = useRecoilValue(authState);

  const [newReply, setNewReply] = useState(content);
  const [isChangeReply, setIsChangeReply] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const { mutate } = useChangeReply(postingId);
  const { mutate: deleteMutate } = useDeleteReply(postingId);

  const changeReply = () => {
    mutate({ content: newReply, id: reply.id });
    setIsChangeReply(false);
  };

  const onChangeOpenReply = () => {
    if (isChangeReply === true) {
      setIsChangeReply(false);
    } else {
      setIsChangeReply(true);
    }
    setNewReply(content);
  };

  const handleChangeOpenComment = () => {
    if (!id) return alert("비회원은 대댓글을 작성할 수 없습니다.");
    if (
      !isAdmin &&
      post.politicalOrientationId !== 5 &&
      politicalOrientationId !== post.politicalOrientationId
    ) {
      return alert("다른 진영의 글에는 대댓글을 달 수 없습니다.");
    }
    onChangeOpenComment(isOpenComment === id ? -1 : reply.id);
  };

  return (
    <Container bg={user.id === id ? COLORS.BG : "#fff"}>
      <Info>
        <div className="flex gap-2 items-center">
          {userPoliticalOrientationId && (
            <Color
              $color={CAMP_COLORS[userPoliticalOrientationId - 1]?.color}
            />
          )}
          <Content level="body1" color={COLORS.TEXT02}>
            {user.nickName}
          </Content>
        </div>
        {!reply.isDelete && !reply.isRestrict && (
          <Recommend reply={reply} post={post} />
        )}
      </Info>
      {isChangeReply ? (
        <>
          <Textarea
            placeholder="타인을 배려하는 마음을 담아 댓글을 작성해 주세요."
            value={newReply}
            height="120px"
            className="mb-4"
            onChange={(e) => setNewReply(e.target.value)}
          />
          <div className="flex justify-end ">
            <Btn $small width="52px" height="32px" onClick={changeReply}>
              등록
            </Btn>
          </div>
        </>
      ) : (
        <CustomContent level="body1l" className="whitespace-pre-wrap">
          {content}
        </CustomContent>
      )}
      <div className="flex gap-3 mt-3">
        <Content level="cap2" color={COLORS.TEXT05}>
          {getDateTimeSecond(createdAt)}
        </Content>
        {!reply.isDelete && !reply.isRestrict && (
          <>
            <Content
              level="cap2"
              color={COLORS.TEXT04}
              className="cursor-pointer"
              onClick={handleChangeOpenComment}
            >
              답글쓰기
            </Content>
            {id === user.id ? (
              <>
                <Content
                  level="cap2"
                  color={COLORS.TEXT04}
                  className="cursor-pointer "
                  onClick={onChangeOpenReply}
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
                    onDelete={() => deleteMutate(reply.id)}
                  />
                )}
              </>
            ) : (
              <Report
                replyId={reply.id}
                politicalOrientation={post.politicalOrientationId}
              />
            )}
          </>
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

export default MobileReply;
