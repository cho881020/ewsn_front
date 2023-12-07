"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";

import { MOBILE_HEADER } from "@/datas/Board";
import COLORS from "@/ui/colors";

const MobileCamp = () => {
  const searchParams = useSearchParams();
  const selectCamp = Number(searchParams.get("camp")) || null;

  return (
    <CampContainer>
      {MOBILE_HEADER.map(({ id, btn, camp }) => {
        const isHot = searchParams.has("hot");
        const query = camp
          ? `camp=${camp}&page=1`
          : `${isHot ? "hot" : ""}&page=1`;
        return (
          <Button
            key={id}
            $active={(selectCamp || 0) === id}
            href={{ pathname: "/board", query }}
          >
            {btn}
          </Button>
        );
      })}
    </CampContainer>
  );
};

const CampContainer = styled.div`
  display: none;
  width: 100%;
  gap: 20px;
  padding: 0 20px;
  border: 1px solid ${COLORS.LINE04};
  @media (max-width: 768px) {
    display: flex;
  }
`;

const Button = styled(Link)<{ $active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 41px;
  margin-bottom: -1px;
  border-bottom: ${({ $active }) => $active && `2px solid ${COLORS.LINE01}`};
  box-sizing: content-box;
  h1 {
    font-size: 16px;
  }
`;

export default MobileCamp;
