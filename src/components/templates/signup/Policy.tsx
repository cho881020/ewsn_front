"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";

import { DATA } from "@/datas/policy";

import unchecked from "@/assets/flag/checkbox.png";
import checked from "@/assets/flag/checkboxChecked.png";
import COLORS from "@/ui/colors";

import ModalTerms from "@/components/organisms/ModalTerms";

interface Props {
  onChangePolicy: (e: boolean) => void;
}

const Policy = ({ onChangePolicy }: Props) => {
  const [isChecked, setIsChecked] = useState([false, false, false]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleChecked = (type: number) => {
    let newChecked = [...isChecked];
    newChecked[type] = !isChecked[type];
    setIsChecked([...newChecked]);
  };

  useEffect(() => {
    !isChecked.includes(false) ? onChangePolicy(true) : onChangePolicy(false);
  }, [isChecked]);

  return (
    <>
      {DATA.map(({ type, link, content, system }) => (
        <Row key={type}>
          <Item onClick={() => handleChecked(type)}>
            <Image src={isChecked[type] ? checked : unchecked} alt="checkbox" />
            <Content>{content}</Content>
          </Item>
          {link ? (
            <a href={link} target="_blank">
              <System>{system}</System>
            </a>
          ) : (
            <System onClick={() => setIsOpenModal(true)}>{system}</System>
          )}
        </Row>
      ))}
      {isOpenModal && <ModalTerms onClose={() => setIsOpenModal(false)} />}
    </>
  );
};

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  @media (max-width: 768px) {
    margin-bottom: 0px;
  }
`;

const Item = styled.div`
  display: flex;
  gap: 6px;
  cursor: pointer;
`;

const Content = styled.p`
  font-size: 16px;
  line-height: 22px;
  font-weight: 400;
  letter-spacing: -0.6px;
  color: ${COLORS.TEXT02};
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const System = styled.div`
  text-decoration: underline;
  color: #2b63f1;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export default Policy;
