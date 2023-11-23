import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styled, { css } from "styled-components";

import { CATEGORIES } from "@/datas/board";

import Input from "@/ui/input";
import { Btn } from "@/ui/buttons";
import COLORS from "@/ui/colors";
import search from "@/assets/board/search.png";

interface Props {
  category: number;
  onChangeCategory: (e: number) => void;
}

const Header = ({ category, onChangeCategory }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState("");

  const isAll = searchParams.get("camp") === "all";
  const camp = searchParams.get("camp") || null;
  const isHot = searchParams.has("hot");

  const handleSearch = () => {
    camp
      ? router.push(`${pathname}?camp=${camp}&page=1&keyword=${keyword}`)
      : router.push(`${pathname}?page=1&keyword=${keyword}`);
  };

  return (
    <Container>
      <Top>
        <BtnContainer>
          {isAll && (
            <>
              <CustomLink href={{ pathname, query: { camp: "all", page: 1 } }}>
                <CustomBtn $gray={!isHot}>NEW</CustomBtn>
              </CustomLink>
              <CustomLink
                href={{ pathname, query: { hot: "", camp: "all", page: 1 } }}
              >
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
      {!isAll && (
        <Bottom>
          <BtnContainer>
            {CATEGORIES.map(({ id, title }) => (
              <CustomBtn
                key={id}
                onClick={() => onChangeCategory(id)}
                $gray={category === id}
              >
                {title}
              </CustomBtn>
            ))}
          </BtnContainer>
          <Btn $small width="52px" height="32px" onClick={handleSearch}>
            글쓰기
          </Btn>
        </Bottom>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Top = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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

export default Header;
