"use client";

import { useState } from "react";

import useCompareCode from "@/apis/mutations/useCompareCode";

import { Title } from "@/ui/fonts";
import { BtnActive } from "@/ui/buttons";

import ValidationInput from "@/components/molecules/ValidationInput";

interface Props {
  email: string;
  validation: boolean;
  onChangeValidation: (e: boolean) => void;
}

const EmailAuth = ({ email, validation, onChangeValidation }: Props) => {
  const [code, setCode] = useState("");
  const [checkedEmail, setCheckedEmail] = useState(false);

  const { mutate } = useCompareCode({
    email,
    code,
    onSuccess: () => {
      setCheckedEmail(true);
      onChangeValidation(true);
    },
  });

  const handleCheck = () => {
    if (!code) return alert("인증 코드를 입력해주세요.");
    mutate();
  };

  return (
    <>
      <Title level="sub3">인증번호 입력</Title>
      <div className="flex gap-3 mb-3">
        <ValidationInput
          placeholder="인증번호 입력"
          success={checkedEmail && validation}
          successContent="인증 완료"
          failure={checkedEmail && !validation}
          failureContent="인증번호를 다시 입력해 주세요."
          value={code}
          onChange={(e: string) => setCode(e)}
          required
        />
        <BtnActive
          $middle
          width="80px"
          height="44px"
          type="button"
          $active={!!code}
          onClick={handleCheck}
        >
          인증
        </BtnActive>
      </div>
    </>
  );
};

export default EmailAuth;
