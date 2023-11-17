import Image from "next/image";
import styled, { css } from "styled-components";

import arrow from "@/assets/board/arrow.png";
import arrowActive from "@/assets/board/arrowActive.png";

import COLORS from "@/ui/colors";

interface Props {
  total: number;
  page: number;
  setPage: (e: number) => void;
}

const Pagination = ({ total, page, setPage }: Props) => {
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
      <BtnArrow onClick={() => setPage(page - 1)} disabled={page === 1}>
        {page <= 1 ? (
          <Image src={arrow} alt="" />
        ) : (
          <Image src={arrowActive} alt="" className="reverse" />
        )}
      </BtnArrow>
      <ButtonWrap>
        {pageArray.map((i) => (
          <Button key={i} onClick={() => setPage(i)} $current={page === i}>
            {i}
          </Button>
        ))}
      </ButtonWrap>
      <BtnArrow onClick={() => setPage(page + 1)} disabled={page === numPages}>
        {page >= numPages ? (
          <Image src={arrow} alt="" className="reverse" />
        ) : (
          <Image src={arrowActive} alt="" />
        )}
      </BtnArrow>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 380px;
  margin: 40px auto 100px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 308px;
  gap: 7.56px;
  margin: 0 auto;
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
`;

export default Pagination;
