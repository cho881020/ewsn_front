"use client";

import styled from "styled-components";

import login from "@/apis/mutations/login";
import { useState } from "react";
import COLORS from "@/ui/colors";
import { Title } from "@/ui/fonts";
import Image from "next/image";
import back from "@/assets/common/back.png";
import Link from "next/link";
import Input from "@/ui/input";
import { Btn } from "@/ui/buttons";

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
          <form className="mt-6">
            <Title level="sub3">아이디</Title>
            <Input
              className="mb-3"
              value={email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
              placeholder="아이디"
            />
            <Title level="sub3">비밀번호</Title>
            <Input
              type="password"
              value={password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
              placeholder="비밀번호"
            />
          </form>
          <Btn onClick={handleLogin}>로그인</Btn>
          <div className="flex items-center gap-3">
            <button className="text-xs text-black-40%">아이디 찾기</button>
            <Line />
            <button className="text-xs text-black-40%">비밀번호 찾기</button>
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
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  background: #ffffff;
  padding: 0 60px;
  width: 580px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Line = styled.div`
  width: 1px;
  height: 12px;
  background-color: #d2d2d2;
`;

export default Login;
