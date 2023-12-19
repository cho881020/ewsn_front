"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import styled from "styled-components";

import useFlag from "@/apis/mutations/useFlag";

import Input from "@/ui/input";
import COLORS from "@/ui/colors";
import { Content, Title } from "@/ui/fonts";
import { Btn } from "@/ui/buttons";

import checkbox from "@/assets/flag/checkbox.png";
import checkboxChecked from "@/assets/flag/checkboxChecked.png";
import Radio from "@/components/templates/flag/Radio";

interface FlagType {
  purpose: string;
  name: string;
  term: { day: string; time: string };
  numberOfPeople: string;
  content: string;
  materials: string[];
  isPermitted: string;
  phoneNumber: string;
  email: string;
}

const Left = ({ openModal }: { openModal: () => void }) => {
  const { mutate } = useFlag(openModal);
  const [state, setState] = useState<FlagType>({
    purpose: "",
    name: "",
    term: { day: "", time: "" },
    numberOfPeople: "",
    content: "",
    materials: [],
    isPermitted: "",
    phoneNumber: "",
    email: "",
  });

  const {
    purpose,
    name,
    term,
    numberOfPeople,
    content,
    materials,
    isPermitted,
    phoneNumber,
    email,
  } = state;

  const handleMaterials = (item: string) => {
    if (materials.includes(item))
      return setState({
        ...state,
        materials: materials.filter((v) => v !== item),
      });
    setState({ ...state, materials: [...materials, item] });
  };

  const handleApply = async (e: FormEvent) => {
    e.preventDefault();
    if (materials.length === 0)
      return alert("지원받을 자재를 하나 이상 선택해주세요.");
    if (!isPermitted) return alert("승인여부를 선택해주세요.");

    mutate({
      purpose,
      name,
      term: term.day + ", " + term.time,
      numberOfPeople: Number(numberOfPeople),
      content,
      materials: materials.join(","),
      isPermitted,
      phoneNumber,
      email,
    });
  };

  return (
    <Container>
      <form onSubmit={handleApply}>
        <Article>
          <Title level="sub3">행사, 집회 목적</Title>
          <Input
            value={purpose}
            onChange={(e) => setState({ ...state, purpose: e.target.value })}
            placeholder="목적"
            required
          />
        </Article>
        <Article>
          <Title level="sub3">주관 단체명 또는 주관자 성명</Title>
          <Input
            value={name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
            placeholder="단체명 또는 성명"
            required
          />
        </Article>
        <Article>
          <Title level="sub3">집회 기간</Title>
          <div className="flex gap-3 sm:flex-col">
            <Input
              value={term.day}
              onChange={(e) =>
                setState({
                  ...state,
                  term: { ...term, day: e.target.value },
                })
              }
              placeholder="날짜(YYYY-MM-DD)"
              required
            />
            <Input
              value={term.time}
              onChange={(e) =>
                setState({
                  ...state,
                  term: { ...term, time: e.target.value },
                })
              }
              placeholder="시간(HH:MM)"
              required
            />
          </div>
        </Article>
        <Article>
          <Title level="sub3">참가인원</Title>
          <Input
            value={numberOfPeople}
            onChange={(e) =>
              setState({ ...state, numberOfPeople: e.target.value })
            }
            placeholder="0"
            required
          />
        </Article>
        <Article>
          <Title level="sub3">집회 장소 및 내용</Title>
          <Input
            value={content}
            onChange={(e) => setState({ ...state, content: e.target.value })}
            placeholder="집회 장소 및 내용"
            required
          />
        </Article>
        <Article>
          <Title level="sub3">지원 받을 자재</Title>
          <div className="flex gap-5 flex-wrap">
            {["현수막", "피켓", "깃발", "머리띠", "기타"].map((item) => (
              <div
                className="flex gap-[6px] w-[100px] cursor-pointer"
                key={item}
                onClick={() => handleMaterials(item)}
              >
                {materials.includes(item) ? (
                  <Image src={checkboxChecked} alt="checkboxChecked" />
                ) : (
                  <Image src={checkbox} alt="checkbox" />
                )}
                <Content color={COLORS.TEXT02}>{item}</Content>
              </div>
            ))}
          </div>
        </Article>
        <Article>
          <Title level="sub3">집회 허가 승인 여부</Title>
          <Radio
            permission={isPermitted}
            onChangePermission={(e: string) =>
              setState({ ...state, isPermitted: e })
            }
          />
        </Article>
        <Article>
          <Title level="sub3">전화번호</Title>
          <Input
            value={phoneNumber}
            onChange={(e) =>
              setState({ ...state, phoneNumber: e.target.value })
            }
            placeholder="전화번호"
            required
          />
        </Article>
        <Article>
          <Title level="sub3">이메일주소</Title>
          <Input
            value={email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
            placeholder="이메일 주소"
            required
          />
        </Article>
        <Btn className="mt-12">전송</Btn>
      </form>
    </Container>
  );
};

const Container = styled.div`
  padding: 120px 100px;
  width: 660px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    padding: 0;
    width: 335px;
    margin-bottom: 60px;
    form {
      max-width: 100%;
    }
  }
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;

export default Left;
