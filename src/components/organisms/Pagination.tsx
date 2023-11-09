import Image from "next/image";
import styled, { css } from "styled-components";

import arrow from "@/assets/board/arrow.png";
import arrowActive from "@/assets/board/arrowActive.png";

interface Props {
  total: number;
  page: number;
  setPage: (e: number) => void;
}

const Pagination = ({ total, page, setPage }: Props) => {
  const pageLimit = 4;
  const startPage = parseInt((page - 1) / 5 + "") * 5 + 1;
  const numPages = Math.ceil(total / 10);
  const endPage =
    startPage + pageLimit > numPages ? numPages : startPage + pageLimit;
  const pageArray = [];
  for (let i = startPage; i <= endPage; i++) {
    pageArray.push(i);
  }

  return (
    <Container>
      <ArrowButtonWrap $left>
        <BtnArrow $left onClick={() => setPage(page - 1)} disabled={page === 1}>
          {page === 1 ? (
            <Image src={arrow} alt="" />
          ) : (
            <Image src={arrowActive} alt="" />
          )}
        </BtnArrow>
      </ArrowButtonWrap>
      <ButtonWrap>
        {pageArray.map((i) => (
          <Button key={i} onClick={() => setPage(i)} current={page === i}>
            {i}
          </Button>
        ))}
      </ButtonWrap>
      <ArrowButtonWrap>
        <BtnArrow
          onClick={() => setPage(page + 1)}
          disabled={page === numPages}
        >
          {page === endPage ? (
            <Image src={arrow} alt="" />
          ) : (
            <Image src={arrowActive} alt="" />
          )}
        </BtnArrow>
      </ArrowButtonWrap>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 380px;
  gap: 5px;
  margin: 40px auto 0;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 170px;
  margin: 0 auto;
`;

const ArrowButtonWrap = styled.div<{ $left?: boolean }>`
  position: absolute;
  top: -1px;
  left: ${({ $left }) => $left && "0"};
  right: ${({ $left }) => !$left && "0"};
  cursor: pointer;
`;

const Button = styled.button<{ current?: boolean }>`
  font-size: 16px;
  line-height: 22px;
  color: #6f6f6f;
  width: 24px;
  height: 24px;
  ${({ current }) =>
    current &&
    css`
      color: #fff;
      background-color: #242424;
    `}
`;

const BtnArrow = styled.button<{ $left?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 1px;
  border: none;
  margin: ${({ $left }) => ($left ? "0 0 0 12px" : "0 12px 0 0")};
  cursor: pointer;
  img {
    ${({ $left }) => !$left && "transform: rotate(180deg)"}
  }
`;

export default Pagination;
