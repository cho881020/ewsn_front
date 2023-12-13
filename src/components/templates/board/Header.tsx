import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import styled, { css } from "styled-components";

import authState from "@/stores/authState";
import useCategoryQuery from "@/apis/queries/useCategoryQuery";

import Input from "@/ui/input";
import { Btn } from "@/ui/buttons";
import COLORS from "@/ui/colors";
import { Content, Title } from "@/ui/fonts";
import search from "@/assets/board/search.png";

const DATAS = [
  { id: 0, type: "d", title: "일간" },
  { id: 1, type: "w", title: "주간" },
  { id: 2, type: "M", title: "월간" },
];

const Header = ({ categoryId }: { categoryId: number | null }) => {
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
  const category = categoryId ? `&category=${categoryId}` : "";
  const keywords = keyword ? `&keyword=${keyword}` : "";

  const handleSearch = () => {
    camp
      ? router.push(`${pathname}?${camps}&page=1${hot}${keywords}${category}`)
      : router.push(`${pathname}?page=1${hot}&keyword=${keyword}`);
  };

  const handleWrite = () => {
    if (!id) return alert("비회원은 글쓰기를 할 수 없습니다.");
    if (!isAdmin && camp !== 5 && politicalOrientationId !== camp) {
      return alert("다른 진영에는 글을 쓸 수 없습니다.");
    }

    router.push(`/write?camp=${camp}`);
  };

  const onlyAdmin = categoryId === 10 || categoryId === 11;
  const writeAuth = isAdmin || camp === 5 || politicalOrientationId === camp;

  return (
    <Container>
      <Top>
        <BtnContainer>
          {!camp && (
            <>
              <CustomLink href={{ pathname, query: { page: 1 } }}>
                <CustomBtn $gray={!isHot}>NEW</CustomBtn>
              </CustomLink>
              <CustomLink href={{ pathname, query: { hot: "", page: 1 } }}>
                <CustomBtn $gray={isHot}>HOT</CustomBtn>
              </CustomLink>
            </>
          )}
        </BtnContainer>
        <div className="flex gap-2 min-w-[380px]">
          <div className="relative w-[292px]">
            <Input
              placeholder="제목,내용,닉네임"
              padding="11px 12px 11px 40px"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Image
              src={search}
              alt=""
              className="absolute left-[10px] top-[10px]"
            />
          </div>
          <Btn $middle width="80px" height="44px" onClick={handleSearch}>
            검색
          </Btn>
        </div>
      </Top>
      {!camp && isHot && (
        <Bottom className="mt-[26px]" $margin="0">
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
            <Line />
          </DateBtnContainer>
        </Bottom>
      )}
      {!!camp && !!categories && (
        <Bottom>
          <BtnContainer>
            <CustomBtn
              onClick={() => router.push(`${pathname}?${camps}${keywords}`)}
              $gray={!categoryId && !isHot}
            >
              전체
            </CustomBtn>
            <CustomBtn
              onClick={() => router.push(`${pathname}?${camps}${keywords}&hot`)}
              $gray={!categoryId && isHot}
            >
              인기
            </CustomBtn>
            {categories?.map(({ id, name }) => (
              <CustomBtn
                key={id}
                onClick={() =>
                  router.push(`${pathname}?${camps}${keywords}&category=${id}`)
                }
                $gray={categoryId === id}
              >
                {name}
              </CustomBtn>
            ))}
          </BtnContainer>
          {writeAuth && (!onlyAdmin || isAdmin) && (
            <Btn $small width="52px" height="32px" onClick={handleWrite}>
              글쓰기
            </Btn>
          )}
        </Bottom>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    display: none;
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
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;

const CustomBtn = styled.button<{ $gray?: boolean }>`
  font-size: 12px;
  padding: 7px 8px;
  height: 32px;
  min-width: 37px;
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

const CustomLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DateBtnContainer = styled(BtnContainer)`
  gap: 0;
`;

const Line = styled.div`
  width: 100%;
  border-bottom: 1px solid ${COLORS.LINE03};
  box-sizing: content-box;
`;

const DateBtn = styled.div<{ $active: boolean }>`
  cursor: pointer;
  width: 54px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${COLORS.LINE03};
  ${({ $active }) =>
    $active &&
    css`
      border: 1px solid ${COLORS.LINE03};
      border-bottom: 3px solid #fff;
    `}
`;

export default Header;
