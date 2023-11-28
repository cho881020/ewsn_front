"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";

import { Posting } from "@/types/posting";
import { getDate } from "@/utils/getDate";
import { HEADERS } from "@/datas/board";

import { Content, Title } from "@/ui/fonts";
import COLORS, { CAMP_COLORS } from "@/ui/colors";

import { TABLE, TD, TH, THEAD, TR, TBODY } from "@/components/atoms/table";
import ModalEnter from "@/components/organisms/ModalEnter";

const Table = ({ list }: { list: Posting[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [id, setId] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const camp = searchParams.get("camp");
  const type = searchParams.get("type") || "";
  const page = searchParams.get("page") || 1;
  const categoryId = Number(searchParams.get("category")) || null;

  const handleEnterPost = (id: number, isRestrict: boolean) => {
    const hot = `${searchParams.has("hot") ? "&hot" : ""}`;
    const camps = camp ? `camp=${camp}` : "";
    const types = type ? `&type=${type}` : "";
    const category = categoryId ? `&category=${categoryId}` : "";
    isRestrict
      ? setIsOpenModal(true)
      : router.push(
          `/post/${id}?${camps}&page=${page}${hot}${category}${types}`
        );
  };

  return (
    <div className="w-full max-w-full">
      <TABLE>
        <colgroup>
          <col width="80px" />
          <col width="80px" />
          <col width="*" />
          <col width="80px" />
          <col width="80px" />
          <col width="80px" />
        </colgroup>
        <THEAD>
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
              isRestrict,
              replies,
              isFixed,
            }) => (
              <TR
                key={id}
                $active={isFixed}
                className="h-[44px] border-b border-[#f0f0f0] last:border-none cursor-pointer"
                onClick={() => {
                  setId(id);
                  handleEnterPost(id, isRestrict);
                }}
              >
                {isFixed ? (
                  <TD>
                    <Btn>필독</Btn>
                  </TD>
                ) : (
                  <TD $gray>{id}</TD>
                )}
                <TD>{category.name}</TD>
                <TD $large className="flex items-center pt-1">
                  <Color
                    $color={CAMP_COLORS[politicalOrientationId - 1].color}
                  />
                  {isRestrict ? (
                    <RestrictContent>{title}</RestrictContent>
                  ) : (
                    <>
                      {isFixed ? (
                        <Title
                          level="sub3"
                          color={COLORS.TEXT01}
                          className="max-w-[614px]"
                        >
                          {title}
                        </Title>
                      ) : (
                        <Content
                          color={COLORS.TEXT02}
                          className="max-w-[614px]"
                        >
                          {title}
                        </Content>
                      )}
                    </>
                  )}
                  <Title
                    level="sub2"
                    color={COLORS.RED}
                    className="ml-2 min-w-[26px]"
                  >
                    {!!replies.length && replies.length}
                  </Title>
                </TD>
                <TD>{user.nickName}</TD>
                <TD $small>{getDate(createdAt)}</TD>
                <TD $small>{hits}</TD>
              </TR>
            )
          )}
        </TBODY>
      </TABLE>
      {isOpenModal && (
        <ModalEnter
          onClose={() => setIsOpenModal(false)}
          onEnter={() => handleEnterPost(id, false)}
        />
      )}
    </div>
  );
};

const Btn = styled.button`
  width: 37px;
  height: 24px;
  border-radius: 4px;
  background-color: #fedbd9;
  font-size: 12px;
  color: ${COLORS.RED};
`;

const Color = styled.div<{ $color: string }>`
  min-width: 4px;
  height: 20px;
  background-color: ${({ $color }) => $color};
  margin-right: 8px;
`;

const RestrictContent = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.6px;
  color: ${COLORS.TEXT04};
  text-decoration: line-through;
  max-width: 614px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default Table;
