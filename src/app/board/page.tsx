"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import usePostingQuery from "@/apis/queries/usePostingQuery";

import search from "@/assets/board/search.png";
import Input from "@/ui/input";
import { Btn } from "@/ui/buttons";
import COLORS, { CAMP_COLORS } from "@/ui/colors";

import { Container } from "@/components/atoms";
import { TABLE, TD, TH, THEAD, TR, TBODY } from "@/components/atoms/table";
import Nav from "@/components/organisms/Nav";
import Pagination from "@/components/organisms/Pagination";
import Banner from "@/components/templates/banner";
import { useRouter, useSearchParams } from "next/navigation";
import Post from "../post/page";

const HEADERS = ["번호", "닉네임", "제목", "카테고리", "작성일", "조회"];
const CATEGORIES = [
  { id: 4, title: "전체" },
  { id: 5, title: "인기" },
  { id: 0, title: "인권,노동" },
  { id: 1, title: "사회" },
  { id: 2, title: "유머" },
  { id: 3, title: "국방" },
];

const Board = () => {
  const [id, setId] = useState(-1);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [isHot, setIsHot] = useState(window.location.search.includes("hot"));
  const [campIndex, setCampIndex] = useState(0);
  const [category, setCategory] = useState(0);
  const { postings } = usePostingQuery({
    item: (campIndex !== 0 && category !== 1) || !isHot ? "hits" : "createdAt",
    range: "desc",
    page: 1,
    categoryId: category !== 4 && category !== 5 ? category : -1,
  });

  const getDate = (createdAt: string) => {
    const today = new Date();
    const resultDate = new Date(createdAt);

    if ((+today - +resultDate) / (60 * 60 * 1000) <= 24) {
      return createdAt.split("T")[1].replaceAll("-", ".").slice(0, 5);
    } else {
      return createdAt.split("T")[0].replaceAll("-", ".");
    }
  };

  useEffect(() => {
    if (window.location.search.includes("hot")) return setIsHot(true);
  }, [window.location.search]);

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
      {id !== -1 && <Post id={id} />}
      <Container>
        <Banner />
        <div className="flex justify-between items-center w-full mb-5">
          {campIndex === 0 ? (
            <BtnContainer>
              <CustomBtn onClick={() => setIsHot(false)} $gray={!isHot}>
                NEW
              </CustomBtn>
              <CustomBtn onClick={() => setIsHot(true)} $gray={isHot}>
                HOT
              </CustomBtn>
            </BtnContainer>
          ) : (
            <BtnContainer>
              {CATEGORIES.map(({ id, title }) => (
                <CustomBtn
                  key={id}
                  onClick={() => setCategory(id)}
                  $gray={category === id}
                >
                  {title}
                </CustomBtn>
              ))}
            </BtnContainer>
          )}
          <div className="flex gap-2 min-w-[380px]">
            <div className="relative w-[292px]">
              <Input
                placeholder="제목,내용,닉네임"
                padding="11px 12px 11px 40px"
              />
              <Image
                src={search}
                alt=""
                className="absolute left-[10px] top-[10px]"
              />
            </div>
            <Btn $middle width="80px" height="44px">
              검색
            </Btn>
          </div>
        </div>
        <TABLE>
          <THEAD className="overflow-scroll">
            <TR>
              {HEADERS.map((title, i) => (
                <TH key={i} className="h-[28px]" $left={title === "제목"}>
                  {title}
                </TH>
              ))}
            </TR>
          </THEAD>
          <TBODY>
            {postings?.map(
              ({
                id,
                title,
                category,
                politicalOrientationId,
                createdAt,
                hits,
              }) => (
                <TR
                  key={id}
                  className="h-[44px] border-b border-[#f0f0f0] last:border-none cursor-pointer"
                  onClick={() => router.push(`/board?id=${id}`)}
                >
                  <TD $gray>{id}</TD>
                  <TD>닉네임</TD>
                  <TD $large className="flex items-center pt-1">
                    <Color
                      color={CAMP_COLORS[politicalOrientationId - 1].color}
                    />
                    <p className="flex-1">{title}</p>
                  </TD>
                  <TD>
                    <p>{category.name}</p>
                  </TD>
                  <TD $small>
                    <p>{getDate(createdAt)}</p>
                  </TD>
                  <TD $small>
                    <p>{hits}</p>
                  </TD>
                </TR>
              )
            )}
          </TBODY>
        </TABLE>
        <Pagination page={page} setPage={setPage} total={1} />
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

export default Board;
