"use client";

import { useSearchParams } from "next/navigation";
import styled from "styled-components";

import { Posting, Postings } from "@/types/posting";

import { Container } from "@/components/atoms";
import Pagination from "@/components/organisms/Pagination";
import Table from "@/components/templates/board/Table";
import Header from "@/components/templates/board/Header";
import MobileList from "@/components/templates/board/MobileList";
import MobileHeader from "@/components/templates/board/MobileHeader";
import MobileSearch from "@/components/templates/board/MobileSearch";
import Banner from "@/components/templates/postList/Banner";

interface Props {
  list: Postings;
  fixList: Posting[];
}

const PostList = ({ list, fixList }: Props) => {
  const searchParams = useSearchParams();
  const categoryId = Number(searchParams.get("category")) || null;

  const { postings, total } = list;

  return (
    <Layout>
      <Header categoryId={categoryId} />
      <MobileHeader categoryId={categoryId} />
      <Table list={postings} fixList={fixList} />
      <MobileList list={postings} fixList={fixList} />
      <Pagination total={total} margin="40px auto 0" />
      <MobileSearch categoryId={categoryId} />
      <Banner />
    </Layout>
  );
};

const Layout = styled(Container)`
  @media (max-width: 768px) {
    padding: 20px 0;
  }
`;

export default PostList;
