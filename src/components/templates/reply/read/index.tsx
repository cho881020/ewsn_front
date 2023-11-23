import { useRecoilValue } from "recoil";
import styled from "styled-components";

import authState from "@/stores/authState";
import { Posting, Replies } from "@/types/posting";

import COLORS from "@/ui/colors";
import { Title } from "@/ui/fonts";
import BestReplies from "@/components/templates/reply/read/BestReplies";
import AllReplies from "@/components/templates/reply/read/AllReplies/index";

interface Props {
  replies: Replies[];
  bestReplies: Replies[];
  post: Posting;
}

const Read = ({ replies, bestReplies, post }: Props) => {
  return (
    <>
      <Header>
        <Title level="sub3" color={COLORS.TEXT01}>
          전체 댓글
        </Title>
        <Title level="sub3" color={COLORS.RED}>
          {replies.length}
        </Title>
      </Header>
      {!!bestReplies.length && (
        <BestReplies bestReplies={bestReplies} post={post} />
      )}
      {!!replies.length && <AllReplies replies={replies} post={post} />}
    </>
  );
};

const Header = styled.header`
  display: flex;
  gap: 4px;
  margin-top: 40px;
  width: 100%;
  padding: 8px 0;
`;

export default Read;
