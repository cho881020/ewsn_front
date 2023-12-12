"use client";

import { useSearchParams } from "next/navigation";
import styled from "styled-components";

import usePostingQuery from "@/apis/queries/usePostingQuery";
import usePostingHotQuery from "@/apis/queries/usePostingHotQuery";
import { getPeriod } from "@/utils/getDate";

import { Container } from "@/components/atoms";
import Nav from "@/components/organisms/Nav";
import Pagination from "@/components/organisms/Pagination";
import MobileCamp from "@/components/organisms/MobileHeader";
import Banner from "@/components/templates/board/Banner";
import Table from "@/components/templates/board/Table";
import Header from "@/components/templates/board/Header";
import MobileHeader from "@/components/templates/board/MobileHeader";
import MobileList from "@/components/templates/board/MobileList";
import MobileSearch from "@/components/templates/board/MobileSearch";
import useAdsQuery from "@/apis/queries/useAdsQuery";

const Board = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const politicalOrientationId = Number(searchParams.get("camp")) || null;
  const keyword = searchParams.get("keyword") || "";
  const categoryId = Number(searchParams.get("category")) || null;
  const typeParams = searchParams.get("type") || "d";
  const { startDate, endDate } = getPeriod(typeParams);
  const isCamp = !!politicalOrientationId;

  const campParams = {
    page,
    keyword,
    politicalOrientationId,
    categoryId,
  };

  const params = {
    page,
    keyword,
    politicalOrientationId,
    categoryId,
    startDate,
    endDate,
  };

  const { postings, total } = usePostingQuery(isCamp ? campParams : params);
  const { hotPostings, hotTotal } = usePostingHotQuery(
    isCamp ? campParams : params
  );
  const { ads } = useAdsQuery();

  if (!ads) return null;
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
            <Table list={searchParams.has("hot") ? hotPostings : postings} />
            <MobileList
              list={searchParams.has("hot") ? hotPostings : postings}
            />
          </>
        )}
        <Pagination
          total={searchParams.has("hot") ? hotTotal || 0 : total || 0}
        />
        <MobileSearch categoryId={categoryId} />
      </Layout>
    </>
  );
};

const Layout = styled(Container)`
  @media (max-width: 768px) {
    padding: 20px 0;
  }
`;

export default Board;
