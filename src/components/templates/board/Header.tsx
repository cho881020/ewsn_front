"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import styled, { css } from "styled-components";

import { CATEGORIES } from "@/datas/board";

import Input from "@/ui/input";
import { Btn } from "@/ui/buttons";
import COLORS from "@/ui/colors";
import search from "@/assets/board/search.png";

interface Props {
  campIndex: number;
  onChangePage: () => void;
  category: number;
  onChangeCategory: (e: number) => void;
}

const Header = ({
  campIndex,
  onChangePage,
  category,
  onChangeCategory,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="flex justify-between items-center w-full mb-5">
      {campIndex === 0 ? (
        <BtnContainer>
          <CustomBtn
            onClick={() => {
              router.push("/board");
              onChangePage();
            }}
            $gray={!searchParams.has("hot")}
          >
            NEW
          </CustomBtn>
          <CustomBtn
            onClick={() => {
              router.push("/board?hot");
              onChangePage();
            }}
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

export default Header;
