"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import styled from "styled-components";

import usePostQuery from "@/apis/queries/usePostQuery";

import arrow from "@/assets/post/arrow.png";
import like from "@/assets/post/like.png";
import likeFill from "@/assets/post/likeFill.png";
import hate from "@/assets/post/hate.png";
import hateFill from "@/assets/post/hateFill.png";

import COLORS from "@/ui/colors";
import { BtnGray } from "@/ui/buttons";
import { Content, Title } from "@/ui/fonts";

import { Container } from "@/components/atoms";
import Nav from "@/components/organisms/Nav";
import Banner from "@/components/templates/banner";
import PostList from "@/components/templates/postList";
import Header from "@/components/templates/post/Header";
import Reply from "@/components/templates/reply";
import useReplyQuery from "@/apis/queries/useReplyQuery";
import Recommend from "@/components/templates/post/Recommend";

const Post = () => {
  const { id } = useParams();
  const { post, likeCounts } = usePostQuery(Number(id));
  const { bestReplies, replies } = useReplyQuery(Number(id));

  return (
    <>
      <Nav />
      {post && likeCounts && (
        <Container>
          <>
            <Banner />
            <Category>
              <Title level="head1">{post?.politicalOrientation.name}</Title>
              <Image src={arrow} alt="" />
              <Title level="head1">{post?.category.name}</Title>
            </Category>
            <Header post={post} />
            <Main>
              <Posting>
                <Content level="body1l" color={COLORS.TEXT01}>
                  {post?.content}
                </Content>
              </Posting>
              <Recommend post={post} likeCounts={likeCounts} />
            </Main>
            <div className="mt-10 w-full flex justify-end">
              <BtnGray width="52px" height="32px" $small>
                <Title level="sub1" color={COLORS.TEXT02}>
                  신고
                </Title>
              </BtnGray>
            </div>
          </>
          <Banner mt="40px" />
          <Reply
            post={post}
            bestReplies={bestReplies || []}
            replies={replies || []}
          />
        </Container>
      )}
      <PostList />
    </>
  );
};

const Category = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 0;
  width: 100%;
  border-bottom: 2px solid ${COLORS.LINE01};
`;

const Main = styled.div`
  padding: 12px 12px 40px;
  width: 100%;
  border-bottom: 1px solid ${COLORS.LINE03};
`;

const Posting = styled.div`
  min-height: 144px;
  margin-bottom: 20px;
`;

export default Post;
