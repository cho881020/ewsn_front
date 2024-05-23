"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import styled from "styled-components";

import useSignUp from "@/apis/mutations/useSignUp";

import radio from "@/assets/signup/radio.png";
import radioActive from "@/assets/signup/radioActive.png";
import Input from "@/ui/input";
import COLORS from "@/ui/colors";
import { Content, Title } from "@/ui/fonts";
import { Btn, BtnWhite } from "@/ui/buttons";

import Radio from "@/components/templates/signup/Radio";
import Header from "@/components/templates/signup/Header";
import Email from "@/components/templates/signup/form/Email";
import Nickname from "@/components/templates/signup/form/Nickname";
import Password from "@/components/templates/signup/form/Password";
import EmailAuth from "@/components/templates/signup/form/EmailAuth";
import Policy from "@/components/templates/signup/Policy";

const SignUp = () => {
  const [isCheckedPolicy, setIsCheckedPolicy] = useState(false);
  const [validations, setValidations] = useState({
    email: false,
    password: false,
    nickName: false,
  });

  const [state, setState] = useState({
    email: "",
    password: "",
    nickName: "",
    gender: "",
    politicalOrientationId: 5,
  });

  const { email, password, nickName, name, phoneNumber, gender } = state;

  const { mutate } = useSignUp();

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    if (!isCheckedPolicy)
      return alert("이용약관 및 개인정보 수집에 동의해주세요.");
    if (!gender) return alert("성별을 선택해주세요.");
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
          <Form onSubmit={handleSignup}>
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
            <Title level="sub3">성별</Title>
            <div className="flex gap-4 mb-4">
              <Item onClick={() => setState({ ...state, gender: "male" })}>
                <Image src={gender === "male" ? radioActive : radio} alt="" />
                <Content color={gender === "male" ? "#000" : COLORS.TEXT02}>
                  남성
                </Content>
              </Item>
              <Item onClick={() => setState({ ...state, gender: "female" })}>
                <Image src={gender === "female" ? radioActive : radio} alt="" />
                <Content color={gender === "female" ? "#000" : COLORS.TEXT02}>
                  여성
                </Content>
              </Item>
            </div>
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
            <Policy onChangePolicy={(e: boolean) => setIsCheckedPolicy(e)} />
            <Btn className="mt-9">가입하기</Btn>
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
  @media (max-width: 768px) {
    width: 100%;
    padding: 40px 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  @media (max-width: 768px) {
    max-width: 500px;
  }
`;

const Item = styled.div`
  display: flex;
  gap: 4px;
  cursor: pointer;
`;

export default SignUp;
