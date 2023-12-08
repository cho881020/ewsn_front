import styled from "styled-components";

import { Posting, Replies } from "@/types/posting";
import { getDateTimeSecond } from "@/utils/getDate";

import { Btn } from "@/ui/buttons";
import { Content } from "@/ui/fonts";
import COLORS, { CAMP_COLORS } from "@/ui/colors";

import { Color, Info } from "@/components/atoms/reply";
import Recommend from "@/components/templates/reply/read/Recommend";
import Report from "@/components/templates/reply/read/AllReplies/Report";

interface Props {
  bestReplies: Replies[];
  post: Posting;
}

const BestReplies = ({ bestReplies, post }: Props) => {
  return (
    <Container>
      {bestReplies.map((bestReply) => {
        const { id, content, user, createdAt, userPoliticalOrientationId } =
          bestReply;
        return (
          <Reply key={id}>
            <Info>
              <div className="flex gap-2 items-center">
                <BtnRed $small width="37px" height="24px">
                  베플
                </BtnRed>
                <Color
                  $color={CAMP_COLORS[userPoliticalOrientationId - 1]?.color}
                />
                <Content level="body1" color={COLORS.TEXT02}>
                  {user.nickName}
                </Content>
                <Content
                  level="cap2"
                  color={COLORS.TEXT05}
                  className="mr-3 sm:hidden"
                >
                  {getDateTimeSecond(createdAt)}
                </Content>
                {id !== user.id && (
                  <div className="sm:hidden">
                    <Report
                      replyId={id}
                      politicalOrientation={post.politicalOrientationId}
                    />
                  </div>
                )}
              </div>
              <Recommend post={post} reply={bestReply} />
            </Info>
            <Content level="body1l">{content}</Content>
            <div className="flex gap-3 mt-3">
              <Content
                level="cap2"
                color={COLORS.TEXT05}
                className="hidden sm:block"
              >
                {getDateTimeSecond(createdAt, "m")}
              </Content>
              {id !== user.id && (
                <div className="hidden sm:block">
                  <Report
                    replyId={id}
                    politicalOrientation={post.politicalOrientationId}
                  />
                </div>
              )}
            </div>
          </Reply>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  border-style: solid none solid none;
  border-width: 1px;
  border-color: ${COLORS.LINE02};
  background-color: ${COLORS.BG};
  width: 100%;
  margin-bottom: 40px;
  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
`;

const Reply = styled.div`
  padding: 20px 12px;
  border-bottom: 1px solid ${COLORS.LINE03};
  &:last-child {
    border: none;
  }
`;

const BtnRed = styled(Btn)`
  background-color: ${COLORS.RED};
  border: none;
  font-weight: 400;
`;

export default BestReplies;
