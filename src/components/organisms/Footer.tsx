"use client";

import Image from "next/image";
import styled from "styled-components";

import logo from "@/assets/common/footerLogo.png";

import COLORS from "@/ui/colors";
import { Content } from "@/ui/fonts";

const Footer = () => {
  return (
    <Wrapper>
      <Container>
        <Image src={logo} alt="logo" />
        <Right>
          <div className="flex gap-2 items-center sm:hidden">
            <Content level="cap2" color={COLORS.TEXT05}>
              회사명 : 동서남북
            </Content>
            <Line />
            <Content level="cap2" color={COLORS.TEXT05}>
              대표자 : 홍길동
            </Content>
            <Line />
            <Content level="cap2" color={COLORS.TEXT05}>
              전화번호: 000-0000-0000
            </Content>
            <Line />
            <Content level="cap2" color={COLORS.TEXT05}>
              E-mail : email@email.com
            </Content>
          </div>
          <div className="gap-2 justify-center hidden sm:flex flex-col">
            <div className="flex gap-2">
              <Content level="cap2" color={COLORS.TEXT05}>
                회사명 : 동서남북
              </Content>
              <Line />
              <Content level="cap2" color={COLORS.TEXT05}>
                대표자 : 홍길동
              </Content>
            </div>
            <Content level="cap2" color={COLORS.TEXT05}>
              전화번호: 000-0000-0000
            </Content>
            <Content level="cap2" color={COLORS.TEXT05}>
              E-mail : email@email.com
            </Content>
          </div>
          <Content level="cap2" color={COLORS.TEXT05}>
            Copyright ©OOO. All Rights Reserved.
          </Content>
          <div className="flex gap-2 items-center">
            <Content level="cap1b" color={COLORS.TEXT05}>
              개인정보처리방침
            </Content>
            <Line />
            <Content level="cap1b" color={COLORS.TEXT05}>
              이용약관
            </Content>
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
