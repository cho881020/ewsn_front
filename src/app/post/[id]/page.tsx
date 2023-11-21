"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import styled from "styled-components";

import usePostQuery from "@/apis/queries/usePostQuery";

import arrow from "@/assets/post/arrow.png";
import like from "@/assets/post/like.png";
import hate from "@/assets/post/hate.png";

import COLORS from "@/ui/colors";
import { BtnGray } from "@/ui/buttons";
import { Content, Title } from "@/ui/fonts";

import { Container } from "@/components/atoms";
import Nav from "@/components/organisms/Nav";
import Banner from "@/components/templates/banner";
import PostList from "@/components/templates/postList";
import Header from "@/components/templates/post/Header";

const Post = () => {
  const { id } = useParams();
  const { post, likeCounts } = usePostQuery(Number(id));

  return (
    <>
      <Nav />
      {post && (
        <Section>
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
            <BtnContainer>
              <Btn>
                <Image src={like} alt="" />
                <Content level="cap2" color={COLORS.TEXT01}>
                  {likeCounts?.likes || 0}
                </Content>
              </Btn>
              <Btn>
                <Image src={hate} alt="" />
                <Content level="cap2" color={COLORS.TEXT01}>
                  {likeCounts?.dislikes || 0}
                </Content>
              </Btn>
            </BtnContainer>
          </Main>
          <div className="mt-10 w-full flex justify-end">
            <BtnGray width="52px" height="32px" $small>
              <Title level="sub1" color={COLORS.TEXT02}>
                신고
              </Title>
            </BtnGray>
          </div>
        </Section>
      )}
      <PostList />
    </>
  );
};

const Section = styled(Container)`
  min-height: fit-content;
  padding: 40px 20px 0;
`;

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

const BtnContainer = styled.div`
  width: 156px;
  margin: 0 auto;
  display: flex;
  gap: 12px;
`;

const Btn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export default Post;
