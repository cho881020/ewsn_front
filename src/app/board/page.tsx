"use client";

import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

import usePostingQuery from "@/apis/queries/usePostingQuery";

import Input from "@/ui/input";
import { CAMP_COLORS } from "@/ui/colors";
import { Btn, BtnGray } from "@/ui/buttons";
import { Container } from "@/components/atoms";
import { TABLE, TD, TH, THEAD, TR, TBODY } from "@/components/atoms/table";
import Pagination from "@/components/organisms/Pagination";
import Banner from "@/components/templates/banner";

const HEADERS = ["번호", "닉네임", "제목", "카테고리", "작성일", "조회"];

const Board = () => {
  const [page, setPage] = useState(1);
  const { postings } = usePostingQuery({
    item: "createdAt",
    range: "desc",
    page: 1,
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

  return (
    <Container>
      <Banner />
      <div className="flex justify-between items-center w-full mb-5">
        <BtnContainer>
          <BtnGray width="44px" height="32px" $small={true}>
            NEW
          </BtnGray>
          <Link href="/board/hot">
            <BtnWhite>HOT</BtnWhite>
          </Link>
        </BtnContainer>
        <div className="flex gap-2 min-w-[380px]">
          <Input width="292px" />
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
                className="h-[44px] border-b border-[#f0f0f0] last:border-none"
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
  );
};

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;

const BtnWhite = styled.button`
  font-size: 12px;
  width: 44px;
  border: 1px solid #fff;
  padding-bottom: 2px;
`;

const Color = styled.div<{ color: string }>`
  width: 4px;
  height: 20px;
  background-color: ${({ color }) => color};
  margin-right: 8px;
`;

export default Board;
