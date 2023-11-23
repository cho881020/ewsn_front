"use client";

import styled from "styled-components";

import COLORS, { CAMP_COLORS } from "@/ui/colors";
import { Content, Title } from "@/ui/fonts";

import { getDateTime } from "@/utils/getDate";
import { Posting } from "@/types/posting";

const Header = ({ post }: { post: Posting }) => {
  const {
    politicalOrientation,
    title,
    user,
    createdAt,
    hits,
    replies,
    userPostLikes,
  } = post;

  const FEEDBACKS = [
    { title: "조회", data: hits },
    { title: "좋아요", data: userPostLikes.filter(({likeType})=>likeType==="LIKE").length },
    { title: "댓글", data: replies.length },
  ];

  return (
    <Container>
      <Title level="sub2" color={COLORS.TEXT01}>
        {title}
      </Title>

      <Info>
        <div className="flex items-center">
          <Color color={CAMP_COLORS[politicalOrientation.id - 1].color} />
          <Content level="cap2" color={COLORS.TEXT01}>
            {user.nickName}
          </Content>
          <Line />
          <Content level="cap2" color={COLORS.TEXT04}>
            {getDateTime(createdAt)}
          </Content>
        </div>

        <div className="flex items-center gap-2">
          {FEEDBACKS.map(({ title, data }) => (
            <div className="flex gap-[2px]" key={title}>
              <Content level="cap2" color={COLORS.TEXT01}>
                {title}
              </Content>
              <Title level="sub1" color={COLORS.TEXT01}>
                {data}
              </Title>
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
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
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
