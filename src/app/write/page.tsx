"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";

import usePosting from "@/apis/mutations/usePosting";
import usePoliticalOrientationQuery from "@/apis/queries/usePoliticalOrientationQuery";

import arrow from "@/assets/post/arrow.png";
import checkbox from "@/assets/write/checkbox.png";
import checkedbox from "@/assets/write/checkedbox.png";

import Input from "@/ui/input";
import COLORS from "@/ui/colors";
import Textarea from "@/ui/textarea";
import { Content, Title } from "@/ui/fonts";
import { Btn, BtnGray } from "@/ui/buttons";

import { Container } from "@/components/atoms";
import Nav from "@/components/organisms/Nav";
import Select from "@/components/templates/write/Select";

const Post = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("camp"));
  const { politicalOrientation } = usePoliticalOrientationQuery({ id });

  const [state, setState] = useState({
    title: "",
    content: "",
    isFixed: false,
    categoryId: 0,
    politicalOrientationId: id,
  });

  const handleCancel = () => {
    router.back();
  };

  const { mutate } = usePosting(state);
  const handleWrite = () => {
    if (!categoryId) return alert("카테고리를 선택해주세요.");
    if (!title) return alert("제목을 입력해주세요.");
    if (!content) return alert("내용을 입력해주세요.");
    mutate();
  };

  const { title, content, isFixed, categoryId } = state;
  return (
    <>
      <Nav />
      <Layout>
        <div className="gap-5 justify-end w-full hidden my-5 pr-5 sm:flex">
          <BtnGray width="52px" $middle height="32px" onClick={handleCancel}>
            취소
          </BtnGray>
          <Btn width="52px" $middle height="32px" onClick={handleWrite}>
            등록
          </Btn>
        </div>
        <Header>
          <Title level="head1" className="sm:hidden">
            {politicalOrientation?.name}
          </Title>
          <Title level="sub3" className="hidden sm:block">
            {politicalOrientation?.name}
          </Title>
          <Image src={arrow} alt="arrow" className="sm:w-4" />
          <Select
            categoryId={categoryId}
            onChangeCategoryId={(e) => setState({ ...state, categoryId: e })}
          />
        </Header>
        {categoryId === 11 && (
          <ImageWrap>
            <Image
              src={isFixed ? checkedbox : checkbox}
              alt="checkbox"
              onClick={() => setState({ ...state, isFixed: !isFixed })}
            />
            <Content
              color={COLORS.TEXT02}
              onClick={() => setState({ ...state, isFixed: !isFixed })}
            >
              공지 고정
            </Content>
          </ImageWrap>
        )}
        <div className="flex flex-col gap-5 w-full mb-10 sm:gap-0 sm:mb-0">
          <CustomInput
            placeholder="제목을 입력해 주세요."
            value={title}
            onChange={(e) => setState({ ...state, title: e.target.value })}
          />
          <CustomTextarea
            placeholder="내용을 입력해 주세요."
            height="628px"
            value={content}
            onChange={(e) => setState({ ...state, content: e.target.value })}
          />
        </div>
        <div className="flex gap-5 justify-end w-full sm:hidden">
          <BtnGray width="80px" $middle height="44px" onClick={handleCancel}>
            취소
          </BtnGray>
          <Btn width="80px" $middle height="44px" onClick={handleWrite}>
            등록
          </Btn>
        </div>
      </Layout>
    </>
  );
};

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 0;
  width: 100%;
  border-bottom: 2px solid ${COLORS.LINE01};
  margin-bottom: 40px;
  @media (max-width: 768px) {
    padding: 13px 20px;
    border: none;
    margin: 0;
  }
`;

const Layout = styled(Container)`
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const CustomInput = styled(Input)`
  @media (max-width: 768px) {
    border: none;
    border-bottom: 1px solid ${COLORS.LINE04};
    padding: 12px 20px;
  }
`;
const CustomTextarea = styled(Textarea)`
  @media (max-width: 768px) {
    border: none;
    padding: 12px 20px;
    height: 540px;
  }
`;

const ImageWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 6px;
  margin-bottom: 20px;
  img,
  p {
    cursor: pointer;
  }
`;

export default Post;
