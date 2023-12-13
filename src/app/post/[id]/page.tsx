"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

import usePostQuery from "@/apis/queries/usePostQuery";
import useReplyQuery from "@/apis/queries/useReplyQuery";
import useDeletePosting from "@/apis/mutations/useDeletePosting";
import authState from "@/stores/authState";

import arrow from "@/assets/post/arrow.png";

import COLORS from "@/ui/colors";
import { BtnGray } from "@/ui/buttons";
import { Title } from "@/ui/fonts";

import { Container } from "@/components/atoms";
import Nav from "@/components/organisms/Nav";
import MobileCamp from "@/components/organisms/MobileHeader";
import ModalDelete from "@/components/organisms/ModalDelete";

import PostList from "@/components/templates/postList";
import Header from "@/components/templates/post/Header";
import Reply from "@/components/templates/reply";
import Banner from "@/components/templates/post/Banner";
import Recommend from "@/components/templates/post/Recommend";
import Report from "@/components/templates/post/Report";

const Post = () => {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const myInfo = useRecoilValue(authState);
  const { post, likeCounts } = usePostQuery(Number(id));
  const { bestReplies, replies } = useReplyQuery(Number(id));
  const isMine = post?.userId === myInfo.id;
  const campId = Number(searchParams.get("camp")) || null;

  const { mutate: deleteMutate } = useDeletePosting({
    id: post?.id || 0,
    onSuccess: () => router.push("/board"),
  });

  const bannerId = campId === null ? 8 : campId + 3;

  return (
    <>
      <Nav />
      <MobileCamp />
      {post && likeCounts && (
        <Layout>
          <>
            <Banner id={bannerId} />
            <Category>
              <Title level="head1" className="sm:hidden">
                {post?.politicalOrientation.name}
              </Title>
              <Title level="sub3" className="hidden sm:block">
                {post?.politicalOrientation.name}
              </Title>
              <Image src={arrow} alt="arrow" className="sm:w-4" />
              <Title level="head1" className="sm:hidden">
                {post?.category.name}
              </Title>
              <Title level="sub3" className="hidden sm:block">
                {post?.category.name}
              </Title>
            </Category>
            <Header post={post} />
            <Main>
              <Posting>
                <CustomReactQuill
                  placeholder="내용을 입력해 주세요."
                  value={post?.content}
                  readOnly
                />
              </Posting>
              <Recommend post={post} likeCounts={likeCounts} />
            </Main>
            {isMine ? (
              <div className="mt-10 w-full flex justify-end gap-5 sm:mt-5 sm:pr-5">
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
                    title="게시글"
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
          <div className="mt-10 sm:mb-5">
            <Banner id={9} />
          </div>
          <Reply
            post={post}
            bestReplies={bestReplies || []}
            replies={replies || []}
          />
        </Layout>
      )}
      <PostList />
    </>
  );
};

const Layout = styled(Container)`
  @media (max-width: 768px) {
    padding: 20px 0;
  }
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 0;
  width: 100%;
  border-bottom: 2px solid ${COLORS.LINE01};
  @media (max-width: 768px) {
    padding: 12px 20px;
  }
`;

const Main = styled.div`
  padding: 12px 12px 40px;
  width: 100%;
  border-bottom: 1px solid ${COLORS.LINE03};
  @media (max-width: 768px) {
    padding: 12px 20px 20px 20px;
    border-bottom: 1px solid ${COLORS.LINE04};
  }
`;

const Posting = styled.div`
  min-height: 144px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    padding-bottom: 12px;
  }
`;

const CustomReactQuill = styled(ReactQuill)`
  .ql-toolbar {
    display: none;
  }
  .ql-snow {
    border: none !important;
  }
`;

export default Post;
