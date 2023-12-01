"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import back from "@/assets/common/back.png";
import flag from "@/assets/flag/flag.png";
import COLORS from "@/ui/colors";
import { Title } from "@/ui/fonts";

const Header = () => {
  const router = useRouter();
  return (
    <Wrapper>
      <Nav>
        <div onClick={() => router.back()}>
          <Image src={back} alt="" />
        </div>
        <Title level="sub3" color="#fff">
          <Image src={flag} alt="" />
        </Title>
      </Nav>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  background: ${COLORS.PRIMARY};
`;

const Nav = styled.div`
  max-width: 1220px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 0 12px;
  position: relative;
  div {
    position: absolute;
    left: 12px;
    cursor: pointer;
  }
`;

export default Header;
