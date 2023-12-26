"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

import useDeletePosting from "@/apis/mutations/useDeletePosting";
import useReplyQuery from "@/apis/queries/useReplyQuery";
import usePostQuery from "@/apis/queries/usePostQuery";
import usePostingQuery from "@/apis/queries/usePostingQuery";
import usePostingHotQuery from "@/apis/queries/usePostingHotQuery";
import usePostingNoticeQuery from "@/apis/queries/usePostingNoticeQuery";
import authState from "@/stores/authState";
import { PostType } from "@/types/posting";

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

const Quill = dynamic(() => import("@/utils/ReadQuill"), { ssr: false }); // client 사이드에서만 동작되기 때문에 ssr false로 설정

const Post = ({ post, reply, id, posts, fixList, params }: PostType) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isHot = searchParams.has("hot");
  const myInfo = useRecoilValue(authState);

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [defaultPost, setDefaultPost] = useState(post);
  const [defaultReply, setDefaultReply] = useState(reply);
  const [postingList, setPostingList] = useState(posts);
  const [postingFixList, setPostingFixList] = useState(fixList);

  const { posting, likeCounts } = defaultPost;
  const { bestReplies, replies } = defaultReply;
  const isMine = posting?.userId === myInfo.id;
  const campId = Number(searchParams.get("camp")) || null;
  const bannerId = campId === null ? 8 : campId + 3;

  const { mutate: deleteMutate } = useDeletePosting({
    id: posting?.id || 0,
    onSuccess: () => router.push("/board"),
  });

  const newPost = usePostQuery(id);
  const newReply = useReplyQuery(id);
  const { postings, total } = usePostingQuery(params);
  const { hotPostings, hotTotal } = usePostingHotQuery(params);
  const { data: newFixPostList, isLoading } = usePostingNoticeQuery({
    politicalOrientationId: params.politicalOrientationId,
    categoryId: params.categoryId,
  });

  useEffect(() => {
    const { posting, likeCounts } = newPost;
    if (!!posting && !!likeCounts) {
      setDefaultPost({ posting, likeCounts });
    }
  }, [newPost.posting, newPost.likeCounts]);

  useEffect(() => {
    const { bestReplies, replies } = newReply;
    if (!!bestReplies && !!replies) {
      setDefaultReply({ bestReplies, replies });
    }
  }, [newReply.bestReplies, newReply.replies]);

  useEffect(() => {
    isHot
      ? setPostingList({ postings: postings || [], total: total || 0 })
      : setPostingList({ postings: hotPostings || [], total: hotTotal || 0 });
  }, [postings, hotPostings]);

  useEffect(() => {
    if (!!newFixPostList) {
      setPostingFixList(newFixPostList);
    }
  }, [newFixPostList, isLoading]);

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
            <div className="hidden">{post.posting.content}</div>
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
      <PostList list={postingList} fixList={postingFixList} />
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

export default Post;
