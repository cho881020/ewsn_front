"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

import back from "@/assets/common/back.png";
import COLORS from "@/ui/colors";
import { Title } from "@/ui/fonts";

const Header = () => {
  return (
    <Wrapper>
      <Nav>
        <Link href="/">
          <Image src={back} alt="" />
        </Link>
        <Title level="sub3" color="#fff">
          회원가입
        </Title>
      </Nav>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  background: ${COLORS.PRIMARY};
`;

const Nav = styled.div`
  max-width: 580px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 0 12px;
  position: relative;
  a {
    position: absolute;
    left: 12px;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    height: 52px;
  }
`;

export default Header;
