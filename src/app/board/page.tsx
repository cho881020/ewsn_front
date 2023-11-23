"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import usePostingQuery from "@/apis/queries/usePostingQuery";
import usePostingHotQuery from "@/apis/queries/usePostingHotQuery";

import { Container } from "@/components/atoms";
import Nav from "@/components/organisms/Nav";
import Pagination from "@/components/organisms/Pagination";
import Banner from "@/components/templates/banner";
import Table from "@/components/templates/board/Table";
import Header from "@/components/templates/board/Header";

const Board = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const camp = Number(searchParams.get("camp")) || null;
  const keyword = searchParams.get("keyword") || "";

  const [category, setCategory] = useState(0);

  const { postings, total } = usePostingQuery({
    page,
    keyword,
    politicalOrientationId: camp,
  });
  const { hotPostings, hotTotal } = usePostingHotQuery({
    page,
    keyword,
    politicalOrientationId: camp,
  });

  return (
    <>
      <Nav />
      <Container>
        <Banner />
        <Header
          category={category}
          onChangeCategory={(e: number) => setCategory(e)}
        />
        {postings && hotPostings && (
          <Table list={searchParams.has("hot") ? hotPostings : postings} />
        )}
        {!!total && !!hotTotal && (
          <Pagination total={searchParams.has("hot") ? hotTotal : total} />
        )}
      </Container>
    </>
  );
};

export default Board;
