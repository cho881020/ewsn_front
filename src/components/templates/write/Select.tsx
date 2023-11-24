"use client";

import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";

import useCategoryWriteQuery from "@/apis/queries/useCategoryWriteQuery";

import arrowBottom from "@/assets/write/arrowBottom.png";
import COLORS from "@/ui/colors";

interface Props {
  categoryId: number;
  onChangeCategoryId: (e: number) => void;
}

const Select = ({ categoryId, onChangeCategoryId }: Props) => {
  const [openCategory, setOpenCategory] = useState(false);
  const { categories } = useCategoryWriteQuery();

  const handleSelect = (id: number) => {
    onChangeCategoryId(id);
    setOpenCategory(false);
  };

  return (
    <div className="relative">
      <Container onClick={() => setOpenCategory((prev) => !prev)}>
        <Text $bold={!!categoryId}>
          {categories?.find(({ id }) => id === categoryId)?.name ||
            "카테고리 선택"}
        </Text>
        <Image
          src={arrowBottom}
          alt="arrowBottom"
          className={`${openCategory && "rotate-180"}`}
        />
      </Container>
      {openCategory && (
        <Popup>
          {categories?.map(({ id, name }) => (
            <PopupMenu key={id} onClick={() => handleSelect(id)}>
              {name}
            </PopupMenu>
          ))}
        </Popup>
      )}
    </div>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  cursor: pointer;
`;

const Text = styled.p<{ $bold: boolean }>`
  font-size: 20px;
  letter-spacing: -0.01em;
  margin-right: 4px;
  font-weight: ${({ $bold }) => ($bold ? "700" : "400")};
`;

const Popup = styled.div`
  position: absolute;
  top: 32px;
  left: -3px;
  width: 136px;
  background: #ffffff;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 2;

  box-shadow: 0px 8px 20px 0px #0000001a;
`;

const PopupMenu = styled.div`
  color: ${COLORS.TEXT01};
  font-size: 16px;
  padding: 11px 12px;
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.BG};
  }
`;

export default Select;
