"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import usePostingQuery from "@/apis/queries/usePostingQuery";
import usePostingHotQuery from "@/apis/queries/usePostingHotQuery";

import { Container } from "@/components/atoms";
import Nav from "@/components/organisms/Nav";
import Pagination from "@/components/organisms/Pagination";
import Post from "@/components/templates/post";
import Banner from "@/components/templates/banner";
import Table from "@/components/templates/board/Table";
import Header from "@/components/templates/board/Header";

const Board = () => {
  const searchParams = useSearchParams();

  const [category, setCategory] = useState(0);
  const [campIndex, setCampIndex] = useState(0);
  const [page, setPage] = useState(1);

  const { postings, total } = usePostingQuery({ page });
  const { hotPostings, hotTotal } = usePostingHotQuery({ page });

  return (
    <>
      <Nav
        campIndex={campIndex}
        onChangeCampIndex={(e: number) => setCampIndex(e)}
      />
      <Post />
      <Container>
        <Banner />
        <Header
          campIndex={campIndex}
          onChangePage={() => setPage(1)}
          category={category}
          onChangeCategory={(e: number) => setCategory(e)}
        />
        {postings && hotPostings && (
          <Table list={searchParams.has("hot") ? hotPostings : postings} />
        )}
        {total && hotTotal && (
          <Pagination
            page={page}
            setPage={setPage}
            total={searchParams.has("hot") ? hotTotal : total}
          />
        )}
      </Container>
    </>
  );
};

export default Board;
