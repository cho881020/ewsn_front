"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";

import unchecked from "@/assets/flag/checkbox.png";
import checked from "@/assets/flag/checkboxChecked.png";
import COLORS from "@/ui/colors";

import ModalTerms from "@/components/organisms/ModalTerms";
import ModalPolicy from "@/components/organisms/ModalPolicy";

interface Props {
  onChangePolicy: (e: boolean) => void;
}

const Policy = ({ onChangePolicy }: Props) => {
  const [isChecked, setIsChecked] = useState([false, false, false]);
  const [isOpenTermsModal, setIsOpenTermsModal] = useState(false);
  const [isOpenPolicyModal, setIsOpenPolicyModal] = useState(false);

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
      <Row>
        <Item onClick={() => handleChecked(0)}>
          <Image src={isChecked[0] ? checked : unchecked} alt="checkbox" />
          <Content>이용 약관에 동의합니다.</Content>
        </Item>
        <System onClick={() => setIsOpenTermsModal(true)}>이용약관</System>
      </Row>

      <Row>
        <Item onClick={() => handleChecked(1)}>
          <Image src={isChecked[1] ? checked : unchecked} alt="checkbox" />
          <Content>개인 정보 수집 및 이용에 동의 합니다.</Content>
        </Item>
        <System onClick={() => setIsOpenPolicyModal(true)}>
          개인정보처리방침
        </System>
      </Row>

      <Row>
        <Item onClick={() => handleChecked(2)}>
          <Image src={isChecked[2] ? checked : unchecked} alt="checkbox" />
          <Content>만 14세 이상입니다.</Content>
        </Item>
      </Row>

      {isOpenTermsModal && (
        <ModalTerms onClose={() => setIsOpenTermsModal(false)} />
      )}
      {isOpenPolicyModal && (
        <ModalPolicy onClose={() => setIsOpenPolicyModal(false)} />
      )}
    </>
  );
};

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  @media (max-width: 768px) {
    margin-bottom: 0px;
  }
`;

const Item = styled.div`
  display: flex;
  gap: 6px;
  cursor: pointer;
  align-items: center;
`;

const Content = styled.p`
  line-height: 22px;
  font-weight: 400;
  letter-spacing: -0.6px;
  color: ${COLORS.TEXT02};
  font-size: 14px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const System = styled.div`
  text-decoration: underline;
  color: #2b63f1;
  cursor: pointer;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export default Policy;
