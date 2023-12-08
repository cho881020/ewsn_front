"use client";

import styled from "styled-components";

import COLORS, { CAMP_COLORS } from "@/ui/colors";
import { Content, Title } from "@/ui/fonts";

import { getDateTime } from "@/utils/getDate";
import { Posting } from "@/types/posting";

const Header = ({ post }: { post: Posting }) => {
  const {
    title,
    user,
    createdAt,
    hits,
    replies,
    userPostLikes,
    userPoliticalOrientationId,
  } = post;

  const FEEDBACKS = [
    { title: "조회", data: hits },
    {
      title: "좋아요",
      data: userPostLikes.filter(({ likeType }) => likeType === "LIKE").length,
    },
    { title: "댓글", data: replies.length },
  ];

  return (
    <Container>
      <Title
        level="sub2"
        color={COLORS.TEXT01}
        className="w-[1156px] max-w-full"
      >
        {title}
      </Title>

      <Info>
        <div className="flex items-center">
          {CAMP_COLORS[userPoliticalOrientationId - 1] && (
            <Color color={CAMP_COLORS[userPoliticalOrientationId - 1].color} />
          )}
          <Content level="cap2" color={COLORS.TEXT01}>
            {user.nickName}
          </Content>
          <Line className="sm:hidden" />
          <Content level="cap2" className="sm:hidden" color={COLORS.TEXT04}>
            {getDateTime(createdAt)}
          </Content>
        </div>

        <div className="flex items-center gap-2">
          <Content
            level="cap2"
            className="hidden sm:block"
            color={COLORS.TEXT04}
          >
            {getDateTime(createdAt, "m")}
          </Content>
          <Line className="hidden sm:block" />
          {FEEDBACKS.map(({ title, data }) => (
            <div className="flex gap-[2px]" key={title}>
              <Content level="cap2" className="sm:hidden" color={COLORS.TEXT01}>
                {title}
              </Content>
              <Title level="sub1" className="sm:hidden" color={COLORS.TEXT01}>
                {data}
              </Title>
              <Content
                level="cap2"
                className="hidden sm:block"
                color={COLORS.TEXT04}
              >
                {title} {data}
              </Content>
            </div>
          ))}
        </div>
      </Info>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 58px;
  padding: 8px 12px;
  background-color: ${COLORS.BG};
  @media (max-width: 768px) {
    height: 98px;
    padding: 12px 20px;
    border-bottom: 1px solid ${COLORS.LINE03};
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  @media (max-width: 768px) {
    margin-top: 12px;
    flex-direction: column;
    gap: 4px;
  }
`;

const Color = styled.div<{ color: string }>`
  width: 4px;
  height: 18px;
  background-color: ${({ color }) => color};
  margin-right: 4px;
`;

const Line = styled.div`
  height: 12px;
  width: 1px;
  background-color: ${COLORS.LINE02};
  margin: 0 8px;
`;

export default Header;
