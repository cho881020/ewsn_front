"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import styled from "styled-components";

import usePostQuery from "@/apis/queries/usePostQuery";
import useEditPosting from "@/apis/mutations/useEditPosting";

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
  const { id } = useParams();
  const { post } = usePostQuery(Number(id));

  const [state, setState] = useState({
    title: "",
    content: "",
    isFixed: false,
    categoryId: 0,
  });

  const { mutate } = useEditPosting({
    ...state,
    id: Number(id),
    onSuccess: () => router.back(),
  });

  const handleCancel = () => {
    router.back();
  };

  const handleWrite = () => {
    if (!title) return alert("제목을 입력해주세요.");
    if (!content) return alert("내용을 입력해주세요.");
    if (!categoryId) return alert("카테고리를 선택해주세요.");
    mutate();
  };

  const { title, content, isFixed, categoryId } = state;

  useEffect(() => {
    setState({
      title: post?.title || "",
      content: post?.content || "",
      isFixed: post?.isFixed || false,
      categoryId: post?.categoryId || 0,
    });
  }, [post]);

  return (
    <>
      <Nav />
      <Container>
        <Header>
          <Title level="head1">{post?.politicalOrientation?.name}</Title>
          <Image src={arrow} alt="arrow" />
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
        <div className="flex flex-col gap-5 w-full mb-10">
          <Input
            placeholder="제목을 입력해 주세요."
            value={title}
            onChange={(e) => setState({ ...state, title: e.target.value })}
          />
          <Textarea
            placeholder="내용을 입력해 주세요."
            height="628px"
            value={content}
            onChange={(e) => setState({ ...state, content: e.target.value })}
          />
        </div>
        <div className="flex gap-5 justify-end w-full">
          <BtnGray width="80px" $middle height="44px" onClick={handleCancel}>
            취소
          </BtnGray>
          <Btn width="80px" $middle height="44px" onClick={handleWrite}>
            등록
          </Btn>
        </div>
      </Container>
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
