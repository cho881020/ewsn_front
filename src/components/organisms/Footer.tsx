"use client";

import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";

import logo from "@/assets/common/footerLogo.svg";

import COLORS from "@/ui/colors";
import { Content } from "@/ui/fonts";
import ModalTerms from "@/components/organisms/ModalTerms";

const Footer = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <Wrapper>
      <Container>
        <Image src={logo} alt="logo" />
        <Right>
          <div className="flex gap-2 items-center sm:hidden">
            <Content level="cap2" color={COLORS.TEXT05}>
              회사명 : iillllilil
            </Content>
            <Line />
            <Content level="cap2" color={COLORS.TEXT05}>
              대표자 : 안도영
            </Content>
            <Line />
            <Content level="cap2" color={COLORS.TEXT05}>
              E-mail : iillllilil@nate.com
            </Content>
          </div>
          <div className="gap-2 justify-center hidden sm:flex flex-col">
            <div className="flex gap-2">
              <Content level="cap2" color={COLORS.TEXT05}>
                회사명 : iillllilil
              </Content>
              <Line />
              <Content level="cap2" color={COLORS.TEXT05}>
                대표자 : 안도영
              </Content>
            </div>
            <Content level="cap2" color={COLORS.TEXT05}>
              E-mail : iillllilil@nate.com
            </Content>
          </div>
          <Content level="cap2" color={COLORS.TEXT05}>
            Copyright ©iillllilil. All Rights Reserved.
          </Content>
          <div className="flex gap-2 items-center">
            <a
              href="https://plip.kr/pcc/99987e74-c04c-4eb2-9899-0503557bcdb3/privacy/1.html"
              target="_blank"
            >
              <Content level="cap1b" color={COLORS.TEXT05}>
                개인정보처리방침
              </Content>
            </a>
            <Line />
            <Content
              className="cursor-pointer"
              level="cap1b"
              color={COLORS.TEXT05}
              onClick={() => setIsOpenModal(true)}
            >
              이용약관
            </Content>
            {isOpenModal && (
              <ModalTerms onClose={() => setIsOpenModal(false)} />
            )}
          </div>
        </Right>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  background: ${COLORS.PRIMARY};
`;

const Container = styled.div`
  max-width: 1220px;
  height: 169px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  align-items: flex-start;
  color: #fff;
  gap: 40px;
  @media (max-width: 1024px) {
    gap: 20px;
  }
  @media (max-width: 768px) {
    gap: 12px;
    height: 181px;
    padding: 20px;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Line = styled.div`
  width: 1px;
  height: 12px;
  background-color: ${COLORS.LINE03};
`;

export default Footer;
