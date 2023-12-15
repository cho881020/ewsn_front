"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

import useDeletePosting from "@/apis/mutations/useDeletePosting";
import authState from "@/stores/authState";
import { Posting, Replies } from "@/types/posting";

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
import Footer from "@/components/organisms/Footer";
import dynamic from "next/dynamic";

const Quill = dynamic(() => import("@/utils/ReadQuill"), { ssr: false }); // client 사이드에서만 동작되기 때문에 ssr false로 설정

interface Props {
  post: {
    posting: Posting;
    likeCounts: {
      likes: number;
      disLikes: number;
    };
  };
  reply: {
    bestReplies: Replies[];
    replies: Replies[];
  };
}

const Post = ({ post, reply }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const myInfo = useRecoilValue(authState);
  const { posting, likeCounts } = post;
  const { bestReplies, replies } = reply;
  const isMine = posting?.userId === myInfo.id;
  const campId = Number(searchParams.get("camp")) || null;

  const { mutate: deleteMutate } = useDeletePosting({
    id: posting?.id || 0,
    onSuccess: () => router.push("/board"),
  });

  const bannerId = campId === null ? 8 : campId + 3;

  return (
    <>
      <Nav />
      <MobileCamp />
      <Layout>
        <>
          <Banner id={bannerId} />
          <Category>
            <Title level="head1" className="sm:hidden">
              {posting?.politicalOrientation.name}
            </Title>
            <Title level="sub3" className="hidden sm:block">
              {posting?.politicalOrientation.name}
            </Title>
            <Image src={arrow} alt="arrow" className="sm:w-4" />
            <Title level="head1" className="sm:hidden">
              {posting?.category.name}
            </Title>
            <Title level="sub3" className="hidden sm:block">
              {posting?.category.name}
            </Title>
          </Category>
          <Header post={posting} />
          <Main>
            <Posting>
              <Quill value={posting?.content} />
            </Posting>
            <Recommend post={posting} likeCounts={likeCounts} />
          </Main>
          {isMine ? (
            <div className="mt-10 w-full flex justify-end gap-5 sm:mt-5 sm:pr-5">
              <BtnGray
                width="52px"
                height="32px"
                $small
                onClick={() =>
                  router.push(
                    `/write/${posting.id}?camp=${posting.politicalOrientationId}`
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
              {!(posting.categoryId === 10 || posting.categoryId === 11) && (
                <Report
                  politicalOrientation={posting?.politicalOrientationId}
                />
              )}
            </>
          )}
        </>
        <div className="mt-10 sm:mb-5">
          <Banner id={9} />
        </div>
        <Reply
          post={posting}
          bestReplies={bestReplies || []}
          replies={replies || []}
        />
      </Layout>
      <PostList />
      <Footer />
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

// const CustomReactQuill = styled(Quill)`
//   .ql-toolbar {
//     display: none;
//   }
//   .ql-snow {
//     border: none !important;
//   }
// `;

export default Post;
