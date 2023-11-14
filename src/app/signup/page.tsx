"use client";

import { useState } from "react";
import styled from "styled-components";

import useSignUp from "@/apis/mutations/useSignUp";

import Input from "@/ui/input";
import COLORS from "@/ui/colors";
import { Title } from "@/ui/fonts";
import { Btn, BtnActive, BtnWhite } from "@/ui/buttons";
import Radio from "@/components/templates/signup/Radio";
import Header from "@/components/templates/signup/Header";

const SignUp = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    nickName: "",
    name: "",
    phoneNumber: "",
    address: "",
    politicalOrientationId: 5,
  });
  const { email, password, nickName, name, phoneNumber, address } = state;

  const { mutate } = useSignUp({
    onSuccess: () => {
      window.location.href = "/";
    },
  });

  const handleLogin = async () => {
    if (!email) return alert("이메일을 입력해주세요.");
    if (!password) return alert("비밀번호를 입력해주세요.");

    mutate(state);
  };

  return (
    <>
      <Header />
      <Layout>
        <Container>
          <Form>
            <Title level="sub3">이메일 주소</Title>
            <div className="flex gap-3">
              <Input
                value={email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
                placeholder="이메일 주소"
                className="mb-3"
              />
              <BtnActive $middle width="80px" height="44px" type="button">
                인증
              </BtnActive>
            </div>
            <Title level="sub3">인증번호 입력</Title>
            <div className="flex gap-3">
              <Input
                value={email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
                placeholder="인증번호 입력"
                className="mb-3"
              />
              <BtnActive $middle width="80px" height="44px" type="button">
                인증
              </BtnActive>
            </div>
            <Title level="sub3">비밀번호</Title>
            <Input
              type="password"
              value={password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
              placeholder="비밀번호"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
              placeholder="비밀번호 확인"
              className="mb-3"
            />
            <Title level="sub3">닉네임</Title>
            <div className="flex gap-3">
              <Input
                value={nickName}
                onChange={(e) =>
                  setState({ ...state, nickName: e.target.value })
                }
                placeholder="닉네임 입력"
                className="mb-3"
              />
              <BtnActive
                $middle
                width="80px"
                height="44px"
                type="button"
                $active={!!nickName}
              >
                중복 확인
              </BtnActive>
            </div>
            <Title level="sub3">이름</Title>
            <Input
              value={name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
              placeholder="이름"
              className="mb-3"
            />
            <Title level="sub3">휴대전화번호</Title>
            <Input
              value={phoneNumber}
              onChange={(e) =>
                setState({ ...state, phoneNumber: e.target.value })
              }
              placeholder="휴대전화번호"
              className="mb-3"
            />
            <Title level="sub3">주소</Title>
            <Input
              value={address}
              onChange={(e) => setState({ ...state, address: e.target.value })}
              placeholder="주소"
              className="mb-3"
            />
            <Title level="sub3">정치 성향 테스트</Title>
            <BtnWhite
              width="119px"
              height="44px"
              $middle
              type="button"
              className="mb-3"
            >
              테스트 하러 가기
            </BtnWhite>
            <Title level="sub3">정치 성향 선택</Title>
            <Radio
              politicalOrientationId={state.politicalOrientationId}
              onChangePoliticalOrientationId={(e: number) =>
                setState({ ...state, politicalOrientationId: e })
              }
            />
            <Btn onClick={handleLogin} type="button">
              가입하기
            </Btn>
          </Form>
        </Container>
      </Layout>
    </>
  );
};

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
  padding: 120px 100px;
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
  gap: 12px;
  width: 100%;
`;

export default SignUp;
