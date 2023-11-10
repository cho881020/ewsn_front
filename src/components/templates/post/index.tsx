"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import search from "@/assets/board/search.png";
import Input from "@/ui/input";
import { Btn } from "@/ui/buttons";
import COLORS, { CAMP_COLORS } from "@/ui/colors";

import { Container } from "@/components/atoms";
import { TABLE, TD, TH, THEAD, TR, TBODY } from "@/components/atoms/table";
import Nav from "@/components/organisms/Nav";
import Pagination from "@/components/organisms/Pagination";
import Banner from "@/components/templates/banner";
import usePostQuery from "@/apis/queries/usePostQuery";
import { useSearchParams } from "next/navigation";

const HEADERS = ["번호", "닉네임", "제목", "카테고리", "작성일", "조회"];
const CATEGORIES = [
  { id: 4, title: "전체" },
  { id: 5, title: "인기" },
  { id: 0, title: "인권,노동" },
  { id: 1, title: "사회" },
  { id: 2, title: "유머" },
  { id: 3, title: "국방" },
];

const Post = () => {
  const [id, setId] = useState(-1);
  const [campIndex, setCampIndex] = useState(0);
  const searchParams = useSearchParams();
  const { post } = usePostQuery(id);

  console.log(post);
  useEffect(() => {
    const id = searchParams.get("id");
    if (id) return setId(Number(id));
  }, [searchParams]);
  return (
    <>
      <Nav
        campIndex={campIndex}
        onChangeCampIndex={(e: number) => setCampIndex(e)}
      />
      <Container>
        <Banner />
        <div className="flex justify-between items-center w-full mb-5">
          동 {">"} 인권/노동
        </div>
      </Container>
    </>
  );
};

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;

const CustomBtn = styled.button<{ $gray?: boolean }>`
  font-size: 12px;
  padding: 7px 8px;
  min-width: 44px;
  border: 1px solid #fff;
  color: ${COLORS.TEXT01};
  ${({ $gray }) =>
    $gray &&
    css`
      padding: 4px 8px;
      border-radius: 4px;
      background-color: ${COLORS.SECONDARY};
      color: ${COLORS.TEXT02};
      font-weight: 700;
    `}
`;

const Color = styled.div<{ color: string }>`
  width: 4px;
  height: 20px;
  background-color: ${({ color }) => color};
  margin-right: 8px;
`;

export default Post;
