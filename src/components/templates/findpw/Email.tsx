"use client";

import { useState } from "react";

import useCompareCode from "@/apis/mutations/useCompareCode";
import useSendCodeFindPw from "@/apis/mutations/useSendCodeFindPw";

import Input from "@/ui/input";
import { Title } from "@/ui/fonts";
import { BtnActive } from "@/ui/buttons";

interface Props {
  email: string;
  onChangeEmail: (e: string) => void;
  onMoveNextPage: () => void;
}

const Email = ({ email, onChangeEmail, onMoveNextPage }: Props) => {
  const [isPostEmail, setIsPostEmail] = useState(false);
  const [code, setCode] = useState("");

  const { mutate: postEmailMutate } = useSendCodeFindPw({
    email,
    onSuccess: () => {
      setIsPostEmail(true);
      alert("인증번호가 발송되었습니다.");
    },
  });

  const { mutate: compareMutate } = useCompareCode({
    email,
    code,
    onSuccess: () => onMoveNextPage(),
  });

  return (
    <div className="w-full sm:max-w-[500px]">
      <div className="mb-3">
        <Title level="sub3">이메일 주소</Title>
      </div>
      <div className="flex gap-3 mb-3 w-full">
        <Input
          height="44px"
          value={email}
          onChange={(e) => onChangeEmail(e.target.value)}
          placeholder="이메일 주소"
          required
        />
        <BtnActive
          $middle
          width="80px"
          height="44px"
          type="button"
          $active={!!email}
          disabled={!email}
          onClick={() => postEmailMutate()}
        >
          {isPostEmail ? "재전송" : "인증 요청"}
        </BtnActive>
      </div>
      <Input
        height="42px"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="인증번호 입력"
        required
      />
      <BtnActive
        height="56px"
        type="button"
        $active={!!email && !!code && !!isPostEmail}
        disabled={!code || !email || !isPostEmail}
        onClick={() => compareMutate()}
        className="mt-12 sm:mt-6"
      >
        다음
      </BtnActive>
    </div>
  );
};

export default Email;
