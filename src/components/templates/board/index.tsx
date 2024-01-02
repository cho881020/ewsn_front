"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";

import usePostingNoticeQuery from "@/apis/queries/usePostingNoticeQuery";
import usePostingQuery from "@/apis/queries/usePostingQuery";
import usePostingHotQuery from "@/apis/queries/usePostingHotQuery";
import { Ad } from "@/types/ad";
import { CampParams, Params } from "@/types/params";
import { Posting, Postings } from "@/types/posting";

import { Container } from "@/components/atoms";
import Nav from "@/components/organisms/Nav";
import Pagination from "@/components/organisms/Pagination";
import MobileCamp from "@/components/organisms/MobileHeader";
import Footer from "@/components/organisms/Footer";
import Banner from "@/components/templates/board/Banner";
import Banner2 from "@/components/templates/postList/Banner";
import Table from "@/components/templates/board/Table";
import Header from "@/components/templates/board/Header";
import MobileHeader from "@/components/templates/board/MobileHeader";
import MobileList from "@/components/templates/board/MobileList";
import MobileSearch from "@/components/templates/board/MobileSearch";

interface Props {
  ads: Ad[];
  posts: Postings;
  fixList: Posting[];
  params: Params | CampParams;
}

const Board = ({ ads, posts, fixList, params }: Props) => {
  const searchParams = useSearchParams();
  const isHot = searchParams.has("hot");
  const politicalOrientationId = Number(searchParams.get("camp")) || null;
  const categoryId = Number(searchParams.get("category")) || null;

  const [postingList, setPostingList] = useState(posts);
  const [postingFixList, setPostingFixList] = useState(fixList);

  const { postings, total } = usePostingQuery(params);
  const { hotPostings, hotTotal } = usePostingHotQuery(params);
  const { data: newFixPost, isLoading } = usePostingNoticeQuery({
    politicalOrientationId: params.politicalOrientationId,
    categoryId: params.categoryId,
  });

  useEffect(() => {
    isHot
      ? setPostingList({ postings: hotPostings || [], total: hotTotal || 0 })
      : setPostingList({ postings: postings || [], total: total || 0 });
  }, [postings, hotPostings]);

  useEffect(() => {
    if (!!newFixPost) {
      setPostingFixList(newFixPost);
    }
  }, [newFixPost, isLoading]);

  return (
    <>
      <Nav />
      <MobileCamp />
      <Layout>
        <Banner ads={ads} politicalOrientationId={politicalOrientationId} />
        <Header categoryId={categoryId} />
        <MobileHeader categoryId={categoryId} />
        <Table list={postingList.postings} fixList={postingFixList} />
        <MobileList list={postingList.postings} fixList={postingFixList} />
        <Pagination total={postingList.total} margin="40px auto 0" />
        <MobileSearch categoryId={categoryId} />
        <Banner2 />
      </Layout>
      <Footer />
    </>
  );
};

const Layout = styled(Container)`
  @media (max-width: 768px) {
    padding: 20px 0;
  }
`;

export default Board;
