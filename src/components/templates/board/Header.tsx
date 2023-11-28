import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import styled, { css } from "styled-components";

import { CATEGORIES } from "@/datas/board";
import authState from "@/stores/authState";

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
  const { id, politicalOrientationId, isAdmin } = useRecoilValue(authState);

  const camp = Number(searchParams.get("camp")) || null;
  const isHot = searchParams.has("hot");

  const handleSearch = () => {
    camp
      ? router.push(`${pathname}?camp=${camp}&page=1&keyword=${keyword}`)
      : router.push(`${pathname}?page=1&keyword=${keyword}`);
  };

  const handleWrite = () => {
    if (!id) return alert("비회원은 글쓰기를 할 수 없습니다.");
    if (!isAdmin && camp !== 5 && politicalOrientationId !== camp) {
      return alert("다른 진영에는 글을 쓸 수 없습니다.");
    }

    router.push(`/write?camp=${camp}`);
  };

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
      {camp && (
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
          <Btn $small width="52px" height="32px" onClick={handleWrite}>
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
