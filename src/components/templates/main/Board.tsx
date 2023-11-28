import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import usePostingQuery from "@/apis/queries/usePostingQuery";
import usePostingHotQuery from "@/apis/queries/usePostingHotQuery";

import COLORS, { CAMP_COLORS } from "@/ui/colors";
import { Content, Title } from "@/ui/fonts";
import { Color } from "@/components/atoms/reply";
import ModalEnter from "@/components/organisms/ModalEnter";

const Board = () => {
  const router = useRouter();
  const { postings } = usePostingQuery({ page: 1 });
  const { hotPostings } = usePostingHotQuery({ page: 1 });
  const [isOpenModal, setIsOpenModal] = useState(false);

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

  const handleEnterPost = (id: number, isRestrict: boolean, title: string) => {
    const hot = `${title === "HOT" ? "&hot" : ""}`;
    isRestrict ? setIsOpenModal(true) : router.push(`/post/${id}?page=1${hot}`);
  };

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
            {posting.list?.map(
              ({ id, title, politicalOrientationId, isRestrict }, i) => (
                <Post key={id}>
                  <Title level="sub2" className="mr-[6px] min-w-[16px]">
                    {i + 1}
                  </Title>
                  <Color
                    className="mr-2"
                    $color={CAMP_COLORS[politicalOrientationId - 1].color}
                  />
                  {isRestrict ? (
                    <>
                      <RestrictContent
                        onClick={() =>
                          handleEnterPost(id, isRestrict, posting.title)
                        }
                      >
                        {title}
                      </RestrictContent>
                      {isOpenModal && (
                        <ModalEnter
                          onClose={() => setIsOpenModal(false)}
                          onEnter={() =>
                            handleEnterPost(id, false, posting.title)
                          }
                        />
                      )}
                    </>
                  ) : (
                    <Content
                      color={COLORS.TEXT01}
                      onClick={() =>
                        handleEnterPost(id, isRestrict, posting.title)
                      }
                    >
                      {title}
                    </Content>
                  )}
                </Post>
              )
            )}
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
`;

const RestrictContent = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.6px;
  color: ${COLORS.TEXT04};
  text-decoration: line-through;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default Board;
