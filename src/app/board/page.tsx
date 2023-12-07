"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";

import usePostingQuery from "@/apis/queries/usePostingQuery";
import usePostingHotQuery from "@/apis/queries/usePostingHotQuery";
import { getPeriod } from "@/utils/getDate";
import { MOBILE_HEADER } from "@/datas/Board";
import COLORS from "@/ui/colors";

import { Container } from "@/components/atoms";
import Nav from "@/components/organisms/Nav";
import Pagination from "@/components/organisms/Pagination";
import Banner from "@/components/templates/board/Banner";
import Table from "@/components/templates/board/Table";
import Header from "@/components/templates/board/Header";
import MobileHeader from "@/components/templates/board/MobileHeader";
import MobileList from "@/components/templates/board/MobileList";

import MobileSearch from "@/components/templates/board/MobileSearch";

const Board = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const politicalOrientationId = Number(searchParams.get("camp")) || null;
  const keyword = searchParams.get("keyword") || "";
  const categoryId = Number(searchParams.get("category")) || null;
  const typeParams = searchParams.get("type") || "d";
  const { startDate, endDate } = getPeriod(typeParams);
  const isCamp = !!politicalOrientationId;
  const selectCamp = Number(searchParams.get("camp")) || null;

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

  return (
    <>
      <Nav />
      <CampContainer>
        {MOBILE_HEADER.map(({ id, btn, camp }) => {
          const isHot = searchParams.has("hot");
          const query = camp
            ? `camp=${camp}&page=1`
            : `${isHot ? "hot" : ""}&page=1`;
          return (
            <Button
              key={id}
              $active={(selectCamp || 0) === id}
              href={{ pathname: "/board", query }}
            >
              {btn}
            </Button>
          );
        })}
      </CampContainer>
      <Layout>
        <Banner />
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

const CampContainer = styled.div`
  display: none;
  width: 100%;
  gap: 20px;
  padding: 0 20px;
  border: 1px solid ${COLORS.LINE04};
  @media (max-width: 768px) {
    display: flex;
  }
`;

const Button = styled(Link)<{ $active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 41px;
  margin-bottom: -1px;
  border-bottom: ${({ $active }) => $active && `2px solid ${COLORS.LINE01}`};
  box-sizing: content-box;
  h1 {
    font-size: 16px;
  }
`;

const Layout = styled(Container)`
  padding: 20px 0;
`;

export default Board;
