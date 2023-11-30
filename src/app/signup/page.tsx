"use client";

import { FormEvent, useState } from "react";
import styled from "styled-components";

import useSignUp from "@/apis/mutations/useSignUp";

import Input from "@/ui/input";
import COLORS from "@/ui/colors";
import { Title } from "@/ui/fonts";
import { Btn, BtnWhite } from "@/ui/buttons";

import Radio from "@/components/templates/signup/Radio";
import Header from "@/components/templates/signup/Header";
import Email from "@/components/templates/signup/form/Email";
import Nickname from "@/components/templates/signup/form/Nickname";
import Password from "@/components/templates/signup/form/Password";
import EmailAuth from "@/components/templates/signup/form/EmailAuth";

const SignUp = () => {
  const [validations, setValidations] = useState({
    email: false,
    password: false,
    nickName: false,
  });

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

  const { mutate } = useSignUp();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!validations.email) return alert("이메일 검증을 해주세요.");
    if (!validations.password) return alert("패스워드 검증을 해주세요.");
    if (!validations.nickName) return alert("닉네임 검증을 해주세요.");

    mutate(state);
  };

  return (
    <>
      <Header />
      <Layout>
        <Container>
          <Form onSubmit={handleLogin}>
            <Email
              value={email}
              onChange={(e: string) => setState({ ...state, email: e })}
            />
            <EmailAuth
              email={email}
              validation={validations.email}
              onChangeValidation={(e: boolean) =>
                setValidations({ ...validations, email: e })
              }
            />
            <Password
              value={password}
              onChange={(e: string) => setState({ ...state, password: e })}
              validation={validations.password}
              onChangeValidation={(e: boolean) =>
                setValidations({ ...validations, password: e })
              }
            />
            <Nickname
              value={nickName}
              onChange={(e: string) => setState({ ...state, nickName: e })}
              validation={validations.nickName}
              onChangeValidation={(e: boolean) =>
                setValidations({ ...validations, nickName: e })
              }
            />

            <Title level="sub3">이름</Title>
            <Input
              value={name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
              placeholder="이름"
              className="mb-3"
              required
            />
            <Title level="sub3">휴대전화번호</Title>
            <Input
              value={phoneNumber}
              onChange={(e) =>
                setState({ ...state, phoneNumber: e.target.value })
              }
              placeholder="휴대전화번호"
              className="mb-3"
              required
            />
            <Title level="sub3">주소</Title>
            <Input
              value={address}
              onChange={(e) => setState({ ...state, address: e.target.value })}
              placeholder="주소"
              className="mb-3"
              required
            />
            <Title level="sub3">정치 성향 테스트</Title>
            <BtnWhite
              width="119px"
              height="44px"
              $middle
              type="button"
              className="mb-3 max-w-[119px]"
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
            <Btn>가입하기</Btn>
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
