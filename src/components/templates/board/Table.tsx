"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";

import usePostingQuery from "@/apis/queries/usePostingQuery";
import usePostingHotQuery from "@/apis/queries/usePostingHotQuery";

import { Posting } from "@/types/posting";
import { getDate } from "@/utils/getDate";
import { HEADERS } from "@/datas/board";

import { CAMP_COLORS } from "@/ui/colors";

import { TABLE, TD, TH, THEAD, TR, TBODY } from "@/components/atoms/table";
import Pagination from "@/components/organisms/Pagination";

interface Props {
  list: Posting[];
  total: number;
}

const Table = () => {
  const { postings, total } = usePostingQuery({ page: 1 });
  const { hotPostings, hotTotal } = usePostingHotQuery({ page: 1 });
  const [info, setInfo] = useState<Props>({ list: [], total: 0 });
  const [page, setPage] = useState(1);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChangeList = useCallback(() => {
    if (hotPostings && postings && total && hotTotal) {
      setInfo(
        searchParams.has("hot")
          ? { list: hotPostings, total: hotTotal }
          : { list: postings, total }
      );
    }
  }, [hotPostings, postings, searchParams]);

  useEffect(() => {
    handleChangeList();
  }, [postings, hotPostings, searchParams, page]);

  return (
    <>
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
          {info.list?.map(
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
                onClick={() =>
                  router.push(
                    searchParams.has("hot")
                      ? `/board?hot&id=${id}`
                      : `/board?id=${id}`
                  )
                }
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
      <Pagination page={page} setPage={setPage} total={info.total} />
    </>
  );
};

const Color = styled.div<{ $color: string }>`
  width: 4px;
  height: 20px;
  background-color: ${({ $color }) => $color};
  margin-right: 8px;
`;

export default Table;
