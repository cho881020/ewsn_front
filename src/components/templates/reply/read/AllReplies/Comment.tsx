import Image from "next/image";
import { useState } from "react";
import { useRecoilValue } from "recoil";

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

const Comment = ({ data, post }: { data: Replies; post: Posting }) => {
  const { id } = useRecoilValue(authState);
  const { user, createdAt, content, postingId } = data;
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
    <Item padding="12px 20px" bg={user.id === id ? COLORS.BG : "#fff"}>
      <Info>
        <div className="flex gap-2 items-center">
          <Image src={comment} alt="comment" />
          <Color $color={CAMP_COLORS[user.politicalOrientationId - 1].color} />
          <Content level="body1" color={COLORS.TEXT02}>
            {user.nickName}
          </Content>
          <Content level="cap2" color={COLORS.TEXT05} className="mr-3">
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
            <Content
              level="cap2"
              color={COLORS.TEXT04}
              className="cursor-pointer"
            >
              신고
            </Content>
          )}
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
        <Content level="body1l" className="whitespace-pre-wrap">
          {content}
        </Content>
      )}
    </Item>
  );
};

export default Comment;
