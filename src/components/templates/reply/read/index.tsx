import { Replies } from "@/types/posting";
import AllReplies from "./AllReplies";
import BestReplies from "./BestReplies";
import styled from "styled-components";
import { Title } from "@/ui/fonts";
import COLORS from "@/ui/colors";
import { useRecoilValue } from "recoil";
import authState from "@/stores/authState";

interface Props {
  replies: Replies[];
  bestReplies: Replies[];
}

const Read = ({ replies, bestReplies }: Props) => {
  const { id } = useRecoilValue(authState);
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
        <BestReplies bestReplies={bestReplies} myId={id} />
      )}
      {!!replies.length && <AllReplies replies={replies} myId={id} />}
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
