"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import useMeQuery from "@/apis/queries/useMeQuery";
import useEditMyInfo from "@/apis/mutations/useEditMyInfo";

import Input from "@/ui/input";
import COLORS from "@/ui/colors";
import { Title } from "@/ui/fonts";
import { Btn, BtnGray } from "@/ui/buttons";

import Header from "@/components/templates/myinfo/Header";
import Nickname from "@/components/templates/myinfo/form/Nickname";
import ModalSignout from "@/components/organisms/ModalSignout";
import ModalPassword from "@/components/organisms/ModalPassword";
import ModalError from "@/components/organisms/ModalError";

const MyInfo = () => {
  const router = useRouter();
  const { myInfo } = useMeQuery();
  const [nickNameValidation, setNickNameValidation] = useState(false);
  const [isOpenErrorModal, setIsOpenErrorModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenPasswordModal, setIsOpenPasswordModal] = useState(false);
  const [state, setState] = useState({
    nickName: "",
    phoneNumber: "",
    address: "",
  });

  const { nickName, phoneNumber, address } = state;

  const { mutate } = useEditMyInfo(state);

  const handleChange = async (e: FormEvent) => {
    e.preventDefault();
    if (myInfo.nickName !== nickName && !nickNameValidation)
      return alert("닉네임 검증을 해주세요.");

    mutate();
  };

  useEffect(() => {
    setState({
      nickName: myInfo?.nickName || "",
      phoneNumber: myInfo?.phoneNumber || "",
      address: myInfo?.address || "",
    });
  }, [myInfo]);

  if (!myInfo) return null;
  return (
    <>
      <Header />
      <Layout>
        <Container>
          <Form onSubmit={handleChange}>
            {isOpenErrorModal && (
              <ModalError onClose={() => setIsOpenErrorModal(false)} />
            )}
            <Article>
              <Title level="sub3">이메일 주소</Title>
              <Input height="44px" value={myInfo?.email} disabled $gray />
            </Article>
            <Article>
              <Title level="sub3">비밀번호</Title>
              <Btn
                type="button"
                $middle
                width="100px"
                height="44px"
                className="w-[100px]"
                onClick={() => setIsOpenPasswordModal(true)}
              >
                비밀번호 변경
              </Btn>
              {isOpenPasswordModal && (
                <ModalPassword onClose={() => setIsOpenPasswordModal(false)} />
              )}
            </Article>
            <Article>
              <Nickname
                value={nickName}
                onChange={(e: string) => setState({ ...state, nickName: e })}
                validation={nickNameValidation}
                onChangeValidation={(e: boolean) => setNickNameValidation(e)}
              />
            </Article>
            <Article>
              <Title level="sub3">이름</Title>
              <Input
                value={myInfo?.name}
                placeholder="이름"
                required
                disabled
                $gray
              />
            </Article>
            <Article>
              <Title level="sub3">휴대전화번호</Title>
              <Input
                value={phoneNumber}
                onChange={(e) =>
                  setState({ ...state, phoneNumber: e.target.value })
                }
                placeholder="휴대전화번호"
                required
              />
            </Article>
            <Article>
              <Title level="sub3">주소</Title>
              <Input
                value={address}
                onChange={(e) =>
                  setState({ ...state, address: e.target.value })
                }
                placeholder="주소"
                required
              />
            </Article>
            <div className="w-full text-right mb-12 sm:mb-6">
              <BtnSignout
                type="button"
                onClick={() => setIsOpenDeleteModal(true)}
              >
                회원탈퇴하기
              </BtnSignout>
              {isOpenDeleteModal && (
                <ModalSignout onClose={() => setIsOpenDeleteModal(false)} />
              )}
            </div>
            <div className="flex justify-between">
              <BtnGray width="80px" type="button" onClick={() => router.back()}>
                취소
              </BtnGray>
              <Btn width="80px">수정</Btn>
            </div>
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
  width: 100%;
  @media (max-width: 768px) {
    max-width: 500px;
  }
`;

const BtnSignout = styled.button`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.6px;
  text-decoration: underline;
  text-decoration-color: ${COLORS.TEXT04};
  color: ${COLORS.TEXT04};
`;

const Article = styled.article`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export default MyInfo;
