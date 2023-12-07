import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import styled, { css } from "styled-components";

import arrow from "@/assets/board/arrow.png";
import arrowActive from "@/assets/board/arrowActive.png";

import COLORS from "@/ui/colors";

const Pagination = ({ total }: { total: number }) => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const camp = searchParams.get("camp");
  const type = searchParams.get("type") || "";
  const categoryId = Number(searchParams.get("category")) || null;
  const hot = `${searchParams.has("hot") ? "&hot" : ""}`;
  const camps = camp ? `camp=${camp}` : "";
  const types = type ? `&type=${type}` : "";
  const category = categoryId ? `&category=${categoryId}` : "";

  const pageLimit = 9;
  const startPage = parseInt((page - 1) / 10 + "") * 10 + 1;
  const numPages = Math.ceil(total / 20);
  const endPage =
    startPage + pageLimit > numPages ? numPages : startPage + pageLimit;
  const pageArray = [];
  for (let i = startPage; i <= endPage; i++) {
    pageArray.push(i);
  }

  return (
    <Container>
      {total !== 0 && (
        <BtnArrow disabled={page === 1}>
          <Link
            href={{
              query: `${camps}&page=${page - 1}${hot}${category}${types}`,
            }}
          >
            {page <= 1 ? (
              <Image src={arrow} alt="" />
            ) : (
              <Image src={arrowActive} alt="" className="reverse" />
            )}
          </Link>
        </BtnArrow>
      )}
      <ButtonWrap>
        {pageArray.map((i) => (
          <Link
            key={i}
            href={{ query: `${camps}&page=${i}${hot}${category}${types}` }}
          >
            <Button $current={page === i}>{i}</Button>
          </Link>
        ))}
      </ButtonWrap>
      {total !== 0 && (
        <BtnArrow disabled={page === numPages}>
          <Link
            href={{
              query: `${camps}&page=${page + 1}${hot}${category}${types}`,
            }}
          >
            {page >= numPages ? (
              <Image src={arrow} alt="" className="reverse" />
            ) : (
              <Image src={arrowActive} alt="" />
            )}
          </Link>
        </BtnArrow>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 380px;
  margin: 40px auto 100px;
  @media (max-width: 768px) {
    margin: 40px auto;
    max-width: 375px;
    padding: 0 14px;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 308px;
  gap: 7.56px;
  margin: 0 auto;
  @media (max-width: 768px) {
    gap: 4px;
  }
`;

const Button = styled.button<{ $current?: boolean }>`
  font-size: 16px;
  line-height: 22px;
  color: ${COLORS.TEXT03};
  width: 24px;
  height: 24px;
  ${({ $current }) =>
    $current &&
    css`
      color: #fff;
      background-color: ${COLORS.PRIMARY};
    `}
`;

const BtnArrow = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 1px;
  border: none;
  cursor: pointer;
  .reverse {
    transform: rotate(180deg);
  }
  &:disabled {
    a {
      pointer-events: none;
    }
  }
`;

export default Pagination;
