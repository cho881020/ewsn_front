"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import styled, { css } from "styled-components";

import authState from "@/stores/authState";
import useCategoryQuery from "@/apis/queries/useCategoryQuery";

import { Btn } from "@/ui/buttons";
import COLORS from "@/ui/colors";
import { Content, Title } from "@/ui/fonts";

const DATAS = [
  { id: 0, type: "d", title: "일간" },
  { id: 1, type: "w", title: "주간" },
  { id: 2, type: "M", title: "월간" },
];

const MobileHeader = ({ categoryId }: { categoryId: number | null }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const { id, politicalOrientationId, isAdmin } = useRecoilValue(authState);
  const { categories } = useCategoryQuery();
  const camp = Number(searchParams.get("camp"));
  const isHot = searchParams.has("hot");
  const typeParams = searchParams.get("type") || "d";

  const hot = `${isHot ? "&hot" : ""}`;
  const camps = camp ? `camp=${camp}` : "";
  const keywords = keyword ? `&keyword=${keyword}` : "";

  const handleWrite = () => {
    if (!id) return alert("비회원은 글쓰기를 할 수 없습니다.");
    if (!isAdmin && camp !== 5 && politicalOrientationId !== camp) {
      return alert("다른 진영에는 글을 쓸 수 없습니다.");
    }

    router.push(`/write?camp=${camp}`);
  };

  const onlyAdmin = categoryId === 10 || categoryId === 11;

  return (
    <Container>
      {!camp && (
        <Top>
          <BtnContainer className="px-5">
            <>
              <CustomLink href={{ pathname, query: { page: 1 } }}>
                <CustomBtn $gray={!isHot}>NEW</CustomBtn>
              </CustomLink>
              <CustomLink href={{ pathname, query: { hot: "", page: 1 } }}>
                <CustomBtn $gray={isHot}>HOT</CustomBtn>
              </CustomLink>
            </>
          </BtnContainer>
        </Top>
      )}
      {!camp && isHot && (
        <Bottom $margin="0">
          <DateBtnContainer>
            <>
              {DATAS.map(({ id, type, title }) => (
                <DateBtn
                  key={id}
                  onClick={() =>
                    router.push(
                      `${pathname}?${camps}${keywords}${hot}&type=${type}`
                    )
                  }
                  $active={typeParams === type}
                >
                  {typeParams === type ? (
                    <Title level="sub1" color={COLORS.TEXT01}>
                      {title}
                    </Title>
                  ) : (
                    <Content level="cap2" color={COLORS.TEXT04}>
                      {title}
                    </Content>
                  )}
                </DateBtn>
              ))}
            </>
          </DateBtnContainer>
        </Bottom>
      )}
      {!!camp && !!categories && (
        <>
          <Bottom>
            <BtnContainer>
              <CustomBtn
                onClick={() => router.push(`${pathname}?${camps}${keywords}`)}
                $gray={!categoryId && !isHot}
              >
                전체
              </CustomBtn>
              <CustomBtn
                onClick={() =>
                  router.push(`${pathname}?${camps}${keywords}&hot`)
                }
                $gray={!categoryId && isHot}
              >
                인기
              </CustomBtn>
              {categories?.map(({ id, name }) => (
                <CustomBtn
                  key={id}
                  onClick={() =>
                    router.push(
                      `${pathname}?${camps}${keywords}&category=${id}`
                    )
                  }
                  $gray={categoryId === id}
                >
                  {name}
                </CustomBtn>
              ))}
            </BtnContainer>
          </Bottom>
          {(!onlyAdmin || isAdmin) && (
            <div className="flex justify-end mb-10 px-5">
              <Btn $small width="52px" height="32px" onClick={handleWrite}>
                글쓰기
              </Btn>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const Top = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Bottom = styled.div<{ $margin?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ $margin }) => ($margin ? $margin : "20px")};
  padding: 0 20px;
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  overflow-x: scroll;
  flex-wrap: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CustomBtn = styled.button<{ $gray?: boolean }>`
  font-size: 12px;
  padding: 7px 8px;
  height: 32px;
  min-width: 37px;
  border: 1px solid #fff;
  color: ${COLORS.TEXT01};
  flex: 0 0 auto;
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

const CustomLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DateBtnContainer = styled(BtnContainer)`
  gap: 0;
`;

const DateBtn = styled.div<{ $active: boolean }>`
  cursor: pointer;
  min-width: 54px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: -1px;
  ${({ $active }) =>
    $active &&
    css`
      border: 1px solid ${COLORS.LINE03};
      border-bottom: 3px solid #fff;
    `}
`;

export default MobileHeader;
