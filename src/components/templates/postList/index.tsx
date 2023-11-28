"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import usePostingQuery from "@/apis/queries/usePostingQuery";
import usePostingHotQuery from "@/apis/queries/usePostingHotQuery";

import { Container } from "@/components/atoms";
import Pagination from "@/components/organisms/Pagination";
import Banner from "@/components/templates/banner";
import Table from "@/components/templates/board/Table";
import Header from "@/components/templates/board/Header";
import { getPeriod } from "@/utils/getDate";

const PostList = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const politicalOrientationId = Number(searchParams.get("camp")) || null;
  const keyword = searchParams.get("keyword") || "";
  const categoryId = Number(searchParams.get("category")) || null;
  const typeParams = searchParams.get("type") || "d";
  const { startDate, endDate } = getPeriod(typeParams);

  const params = {
    page,
    keyword,
    politicalOrientationId,
    categoryId,
    startDate,
    endDate,
  };

  const { postings, total } = usePostingQuery(params);
  const { hotPostings, hotTotal } = usePostingHotQuery(params);

  return (
    <Container>
      <Banner />
      <Header categoryId={categoryId} />
      {postings && hotPostings && (
        <Table list={searchParams.has("hot") ? hotPostings : postings} />
      )}
      {!!total && !!hotTotal && (
        <Pagination total={searchParams.has("hot") ? hotTotal : total} />
      )}
    </Container>
  );
};

export default PostList;
