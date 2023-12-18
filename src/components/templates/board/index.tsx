"use client";

import { useSearchParams } from "next/navigation";
import styled from "styled-components";

import { Ad } from "@/types/ad";
import { Postings } from "@/types/posting";

import { Container } from "@/components/atoms";
import Nav from "@/components/organisms/Nav";
import Pagination from "@/components/organisms/Pagination";
import MobileCamp from "@/components/organisms/MobileHeader";
import Footer from "@/components/organisms/Footer";
import Banner from "@/components/templates/board/Banner";
import Table from "@/components/templates/board/Table";
import Header from "@/components/templates/board/Header";
import MobileHeader from "@/components/templates/board/MobileHeader";
import MobileList from "@/components/templates/board/MobileList";
import MobileSearch from "@/components/templates/board/MobileSearch";

interface Props {
  ads: Ad[];
  posts: Postings;
  hotPosts: Postings;
}
const Board = ({ ads, posts, hotPosts }: Props) => {
  const searchParams = useSearchParams();
  const politicalOrientationId = Number(searchParams.get("camp")) || null;
  const categoryId = Number(searchParams.get("category")) || null;
  const isHot = searchParams.has("hot");

  const { postings, total } = posts;
  const hotPostings = hotPosts.postings;
  const hotTotal = hotPosts.total;

  return (
    <>
      <Nav />
      <MobileCamp />
      <Layout>
        <Banner ads={ads} politicalOrientationId={politicalOrientationId} />
        <Header categoryId={categoryId} />
        <MobileHeader categoryId={categoryId} />
        {!!postings && !!hotPostings && (
          <>
            <Table list={isHot ? hotPostings : postings} />
            <MobileList list={isHot ? hotPostings : postings} />
          </>
        )}
        <Pagination total={isHot ? hotTotal : total} />
        <MobileSearch categoryId={categoryId} />
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