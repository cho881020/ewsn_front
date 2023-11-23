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
    <Container>
      <Header>
        <Title level="sub2" color={COLORS.LINE01}>
          댓글쓰기
        </Title>
      </Header>
      <Textarea
        placeholder="타인을 배려하는 마음을 담아 댓글을 작성해 주세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        height="123px"
        className="mb-3"
        onKeyDown={enterKeyPress}
      />
      <div className="flex justify-end">
        <Btn $small width="52px" height="32px" onClick={postReply}>
          등록
        </Btn>
      </div>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${COLORS.BG};
  width: 100%;
  padding: 12px;
`;

const Header = styled.header`
  padding: 8px 0;
  border-bottom: 1px solid ${COLORS.LINE02};
  margin-bottom: 12px;
`;

export default Write;
