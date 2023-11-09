"use client";

import styled from "styled-components";

import usePostingQuery from "@/apis/queries/usePostingQuery";
import { CAMP_COLORS } from "@/ui/colors";
import { Content, Title } from "@/ui/fonts";

const Board = () => {
  const { postings: hits } = usePostingQuery({
    item: "hits",
    range: "desc",
    page: 1,
  });

  const { postings: created } = usePostingQuery({
    item: "createdAt",
    range: "desc",
    page: 1,
  });

  const postings = [
    { title: "NEW", list: created?.slice(0, 10) },
    { title: "HOT", list: hits?.slice(0, 10) },
  ];

  return (
    <Container>
      {postings.map(({ title, list }) => (
        <Item key={title}>
          <Header>
            <Title level="head1">{title}</Title>
            <Content level="body1">더보기</Content>
          </Header>
          <Posts>
            {list?.map(({ id, title, politicalOrientationId }, i) => (
              <Post key={id}>
                <Number>{i + 1}</Number>
                <Color color={CAMP_COLORS[politicalOrientationId - 1].color} />
                <p>{title}</p>
              </Post>
            ))}
          </Posts>
        </Item>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 20px;
  max-width: 100%;
`;

const Item = styled.div`
  width: 580px;
  max-width: calc(50% - 10px);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #242424;
  padding: 12px;
  p {
    color: #555;
    cursor: pointer;
  }
`;

const Posts = styled.div`
  padding: 16px 12px;
`;

const Post = styled.div`
  display: flex;
  margin-bottom: 12px;
`;

const Number = styled.p`
  width: 26px;
`;

const Color = styled.div<{ color: string }>`
  width: 4px;
  height: 20px;
  background-color: ${({ color }) => color};
  margin-right: 8px;
`;

export default Board;
