"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import usePostQuery from "@/apis/queries/usePostQuery";
import useReplyQuery from "@/apis/queries/useReplyQuery";
import useDeletePosting from "@/apis/mutations/useDeletePosting";
import authState from "@/stores/authState";

import arrow from "@/assets/post/arrow.png";

import COLORS from "@/ui/colors";
import { BtnGray } from "@/ui/buttons";
import { Content, Title } from "@/ui/fonts";

import { Container } from "@/components/atoms";
import Nav from "@/components/organisms/Nav";
import Banner from "@/components/templates/banner";
import PostList from "@/components/templates/postList";
import Header from "@/components/templates/post/Header";
import Reply from "@/components/templates/reply";
import Recommend from "@/components/templates/post/Recommend";
import ModalDelete from "@/components/organisms/ModalDelete";
import Report from "@/components/templates/post/Report";

const Post = () => {
  const { id } = useParams();
  const router = useRouter();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const myInfo = useRecoilValue(authState);
  const { post, likeCounts } = usePostQuery(Number(id));
  const { bestReplies, replies } = useReplyQuery(Number(id));
  const isMine = post?.userId === myInfo.id;

  const { mutate: deleteMutate } = useDeletePosting({
    id: post?.id || 0,
    onSuccess: () => router.back(),
  });

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
                <CustomContent level="body1l" color={COLORS.TEXT01}>
                  {post?.content}
                </CustomContent>
              </Posting>
              <Recommend post={post} likeCounts={likeCounts} />
            </Main>
            {isMine ? (
              <div className="mt-10 w-full flex justify-end gap-5">
                <BtnGray
                  width="52px"
                  height="32px"
                  $small
                  onClick={() =>
                    router.push(
                      `/write/${post.id}?camp=${post.politicalOrientationId}`
                    )
                  }
                >
                  <Title level="sub1" color={COLORS.TEXT02}>
                    수정
                  </Title>
                </BtnGray>
                <BtnGray
                  width="52px"
                  height="32px"
                  $small
                  onClick={() => setIsOpenDeleteModal(true)}
                >
                  <Title level="sub1" color={COLORS.TEXT02}>
                    삭제
                  </Title>
                </BtnGray>
                {isOpenDeleteModal && (
                  <ModalDelete
                    title="댓글"
                    onClose={() => setIsOpenDeleteModal(false)}
                    onDelete={() => deleteMutate()}
                  />
                )}
              </div>
            ) : (
              <>
                {!(post.categoryId === 10 || post.categoryId === 11) && (
                  <Report politicalOrientation={post?.politicalOrientationId} />
                )}
              </>
            )}
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

const CustomContent = styled(Content)`
  max-width: 100%;
  overflow: visible;
  white-space: pre-line;
  word-break: break-all;
`;

export default Post;
