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

const PostList = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const keyword = searchParams.get("keyword") || "";

  const [category, setCategory] = useState(0);

  const { postings, total } = usePostingQuery({ page, keyword });
  const { hotPostings, hotTotal } = usePostingHotQuery({ page, keyword });

  return (
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
  );
};

export default PostList;
