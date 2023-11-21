"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const isAll = searchParams.get("camp") === "all";
  const isHot = searchParams.has("hot");

  return (
    <div className="flex justify-between items-center w-full mb-5">
      {isAll ? (
        <BtnContainer>
          <CustomLink href={{ pathname, query: { camp: "all", page: 1 } }}>
            <CustomBtn $gray={!isHot}>NEW</CustomBtn>
          </CustomLink>
          <CustomLink
            href={{ pathname, query: { hot: "", camp: "all", page: 1 } }}
          >
            <CustomBtn $gray={isHot}>HOT</CustomBtn>
          </CustomLink>
        </BtnContainer>
      ) : (
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
      )}
      <div className="flex gap-2 min-w-[380px]">
        <div className="relative w-[292px]">
          <Input placeholder="제목,내용,닉네임" padding="11px 12px 11px 40px" />
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
  height: 32px;
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

const CustomLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Header;
