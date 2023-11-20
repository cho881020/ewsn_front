"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

import login from "@/apis/mutations/login";

import back from "@/assets/common/back.png";
import logo from "@/assets/login/logo.png";

import Input from "@/ui/input";
import COLORS from "@/ui/colors";
import { Content, Title } from "@/ui/fonts";
import { Btn, BtnWhite } from "@/ui/buttons";

const Login = () => {
  const [state, setState] = useState({ email: "", password: "" });
  const { email, password } = state;

  const handleLogin = async () => {
    if (!email) return alert("이메일을 입력해주세요.");
    if (!password) return alert("비밀번호를 입력해주세요.");

    const { token, message } = await login(state);
    if (token) {
      localStorage.TOKEN = token;
      window.location.href = "/";
    } else {
      alert(message);
    }
  };

  return (
    <>
      <Wrapper>
        <Nav>
          <Link href="/">
            <Image src={back} alt="" />
          </Link>
          <Title level="sub3" color="#fff">
            로그인
          </Title>
        </Nav>
      </Wrapper>
      <Layout>
        <Container>
          <Image src={logo} alt="" />
          <Form>
            <Title level="sub3">아이디</Title>
            <Input
              value={email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
              placeholder="아이디"
              $center
            />
            <Title level="sub3">비밀번호</Title>
            <Input
              type="password"
              value={password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
              placeholder="비밀번호"
              $center
            />
          </Form>
          <Btn onClick={handleLogin}>로그인</Btn>
          <div className="flex items-center gap-3 mt-6">
            <Content color={COLORS.TEXT03}>아이디 찾기</Content>
            <Line />
            <Content color={COLORS.TEXT03}>비밀번호 찾기</Content>
          </div>
          <div className="flex justify-center gap-3 mt-6 w-full">
            <Content color={COLORS.TEXT03}>아직 회원이 아니세요?</Content>
            <Link href="/signup">
              <BtnWhite width="58px" height="24px" $small>
                회원가입
              </BtnWhite>
            </Link>
          </div>
        </Container>
      </Layout>
    </>
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
`;

const Layout = styled.div`
  background-color: ${COLORS.BG};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  background: #ffffff;
  padding: 20px 60px;
  width: 580px;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin: 24px 0;
  width: 100%;
`;
const Line = styled.div`
  width: 1px;
  height: 12px;
  background-color: ${COLORS.LINE02};
`;

export default Login;