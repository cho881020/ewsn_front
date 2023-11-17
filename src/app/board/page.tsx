"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import styled, { css } from "styled-components";

import usePostingQuery from "@/apis/queries/usePostingQuery";
import usePostingHotQuery from "@/apis/queries/usePostingHotQuery";

import Posting from "@/types/posting";
import { getDate } from "@/utils/getDate";
import { CATEGORIES, HEADERS } from "@/datas/board";

import search from "@/assets/board/search.png";
import Input from "@/ui/input";
import { Btn } from "@/ui/buttons";
import COLORS, { CAMP_COLORS } from "@/ui/colors";

import { Container } from "@/components/atoms";
import { TABLE, TD, TH, THEAD, TR, TBODY } from "@/components/atoms/table";
import Nav from "@/components/organisms/Nav";
import Pagination from "@/components/organisms/Pagination";
import Post from "@/components/templates/post";
import Banner from "@/components/templates/banner";

const Board = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [id, setId] = useState(-1);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(0);
  const [campIndex, setCampIndex] = useState(0);
  const [list, setList] = useState<Posting["postings"]>([]);

  const { postings, total } = usePostingQuery({ page });
  const { hotPostings, hotTotal } = usePostingHotQuery({ page });

  useEffect(() => {
    if (searchParams.has("hot")) {
      setList(hotPostings || []);
    } else {
      setList(postings || []);
    }
  }, [searchParams, list, page]);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) return setId(Number(id));
  }, [searchParams]);

  if (!postings || !hotPostings || !total || !hotTotal) return null;
  return (
    <>
      <Nav
        campIndex={campIndex}
        onChangeCampIndex={(e: number) => setCampIndex(e)}
      />
      {id !== -1 && searchParams.has("id") && <Post id={id} />}
      <Container>
        <Banner />
        <div className="flex justify-between items-center w-full mb-5">
          {campIndex === 0 ? (
            <BtnContainer>
              <CustomBtn
                onClick={() => router.push("/board")}
                $gray={!searchParams.has("hot")}
              >
                NEW
              </CustomBtn>
              <CustomBtn
                onClick={() => router.push("/board?hot")}
                $gray={searchParams.has("hot")}
              >
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
            {list.map(
              ({
                id,
                title,
                category,
                politicalOrientationId,
                createdAt,
                hits,
                user,
              }) => (
                <TR
                  key={id}
                  className="h-[44px] border-b border-[#f0f0f0] last:border-none cursor-pointer"
                  onClick={() => router.push(`/board?id=${id}`)}
                >
                  <TD $gray>{id}</TD>
                  <TD>{category.name}</TD>
                  <TD $large className="flex items-center pt-1">
                    <Color
                      $color={CAMP_COLORS[politicalOrientationId - 1].color}
                    />
                    <p className="flex-1">{title}</p>
                  </TD>
                  <TD>{user.nickName}</TD>
                  <TD $small>{getDate(createdAt)}</TD>
                  <TD $small>{hits}</TD>
                </TR>
              )
            )}
          </TBODY>
        </TABLE>
        <Pagination
          page={page}
          setPage={setPage}
          total={searchParams.has("hot") ? hotTotal : total}
        />
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

const Color = styled.div<{ $color: string }>`
  width: 4px;
  height: 20px;
  background-color: ${({ $color }) => $color};
  margin-right: 8px;
`;

export default Board;
