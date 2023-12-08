import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import useReply from "@/apis/mutations/useReply";
import { Posting } from "@/types/posting";
import authState from "@/stores/authState";

import { Btn } from "@/ui/buttons";
import COLORS from "@/ui/colors";
import { Title } from "@/ui/fonts";
import Textarea from "@/ui/textarea";

const Write = ({ post }: { post: Posting }) => {
  const [content, setContent] = useState("");
  const { mutate } = useReply(post.id);
  const { politicalOrientationId, isAdmin, isLogin } =
    useRecoilValue(authState);

  const postReply = () => {
    if (!isLogin) return alert("비회원은 댓글을 작성할 수 없습니다.");
    if (
      !isAdmin &&
      post.politicalOrientationId !== 5 &&
      politicalOrientationId !== post.politicalOrientationId
    ) {
      return alert("다른 진영의 글에는 댓글을 달 수 없습니다.");
    }
    mutate({ postingId: post.id, content });
    setContent("");
  };

  const enterKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        e.preventDefault();
        postReply();
      }
    }
  };

  return (
    <>
      {post.replies.length === 0 && (
        <ReplyLength>
          <Title level="sub3" color={COLORS.TEXT01}>
            전체 댓글
          </Title>
          <Title level="sub3" color={COLORS.RED}>
            0
          </Title>
        </ReplyLength>
      )}
      <Container>
        <Header>
          <Title level="sub2" color={COLORS.LINE01}>
            댓글쓰기
          </Title>
        </Header>
        <CustomTextarea
          placeholder="타인을 배려하는 마음을 담아 댓글을 작성해 주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          height="123px"
          className="mb-3 sm:mb-5"
          onKeyDown={enterKeyPress}
        />
        <div className="flex justify-end">
          <Btn $small width="52px" height="32px" onClick={postReply}>
            등록
          </Btn>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  background-color: ${COLORS.BG};
  width: 100%;
  padding: 12px;
  @media (max-width: 768px) {
    padding: 12px 20px;
  }
`;

const Header = styled.header`
  padding: 8px 0;
  border-bottom: 1px solid ${COLORS.LINE02};
  margin-bottom: 12px;
`;

const CustomTextarea = styled(Textarea)`
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ReplyLength = styled.header`
  display: flex;
  gap: 4px;
  width: 100%;
  padding: 8px 0;
`;

export default Write;
