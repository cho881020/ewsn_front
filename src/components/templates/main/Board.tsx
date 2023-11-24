import Link from "next/link";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import usePostingQuery from "@/apis/queries/usePostingQuery";
import usePostingHotQuery from "@/apis/queries/usePostingHotQuery";

import COLORS, { CAMP_COLORS } from "@/ui/colors";
import { Content, Title } from "@/ui/fonts";
import { Color } from "@/components/atoms/reply";

const Board = () => {
  const router = useRouter();
  const { postings } = usePostingQuery({ page: 1 });
  const { hotPostings } = usePostingHotQuery({ page: 1 });

  const POSTING = [
    {
      title: "NEW",
      list: postings?.slice(0, 10) || [],
      link: { pathname: "board", query: { page: "1" } },
    },
    {
      title: "HOT",
      list: hotPostings?.slice(0, 10) || [],
      link: { pathname: "board", query: { hot: "", page: "1" } },
    },
  ];

  return (
    <Container>
      {POSTING.map((posting) => (
        <Item key={posting.title}>
          <Header>
            <Title level="head1">{posting.title}</Title>
            <Link href={posting.link}>
              <Content level="body1">더보기</Content>
            </Link>
          </Header>
          <div className="py-4 px-3">
            {posting.list?.map(({ id, title, politicalOrientationId }, i) => (
              <Post
                key={id}
                onClick={() =>
                  router.push(
                    posting.title === "HOT"
                      ? `/post/${id}?hot=&page=1`
                      : `/post/${id}?page=1`
                  )
                }
              >
                <Title level="sub2" className="mr-[7px]">
                  {i + 1}
                </Title>
                <Color $color={CAMP_COLORS[politicalOrientationId - 1].color} />
                <Content color={COLORS.TEXT01}>{title}</Content>
              </Post>
            ))}
          </div>
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

const Post = styled.div`
  display: flex;
  margin-bottom: 12px;
  cursor: pointer;
  align-items: center;
  gap: 8px;
`;

export default Board;
