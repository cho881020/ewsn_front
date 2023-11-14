"use client";

import { useState } from "react";

import { Title } from "@/ui/fonts";
import { BtnActive } from "@/ui/buttons";

import ValidationInput from "@/components/molecules/ValidationInput";

interface Props {
  validation: boolean;
  onChangeValidation: (e: boolean) => void;
}

const EmailAuth = ({ validation, onChangeValidation }: Props) => {
  const [value, setValue] = useState("");
  const [checkedEmail, setCheckedEmail] = useState(false);

  const handleCheck = () => {
    setCheckedEmail(true);
    onChangeValidation(true);
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
          value={value}
          onChange={(e: string) => setValue(e)}
          required
        />
        <BtnActive
          $middle
          width="80px"
          height="44px"
          type="button"
          $active={!!value}
          onClick={() => value && handleCheck()}
        >
          인증
        </BtnActive>
      </div>
    </>
  );
};

export default EmailAuth;
