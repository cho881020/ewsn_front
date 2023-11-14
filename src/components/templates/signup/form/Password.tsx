"use client";

import { useEffect, useState } from "react";

import Input from "@/ui/input";
import { Title } from "@/ui/fonts";

import ValidationInput from "@/components/molecules/ValidationInput";

interface Props {
  value: string;
  onChange: (e: string) => void;
  validation: boolean;
  onChangeValidation: (e: boolean) => void;
}

const Password = ({
  value,
  onChange,
  validation,
  onChangeValidation,
}: Props) => {
  const [passwordCheck, setPasswordCheck] = useState("");

  useEffect(() => {
    if (!!value && !!passwordCheck) {
      value === passwordCheck
        ? onChangeValidation(true)
        : onChangeValidation(false);
    }
  }, [value, passwordCheck]);

  return (
    <div className="flex flex-col gap-3 mb-3">
      <Title level="sub3">비밀번호</Title>
      <Input
        type="password"
        value={value}
        autoComplete="new-password"
        onChange={(e) => onChange(e.target.value)}
        placeholder="비밀번호"
        required
      />
      <ValidationInput
        type="password"
        value={passwordCheck}
        onChange={(e: string) => setPasswordCheck(e)}
        failure={!!value && !!passwordCheck && !validation}
        failureContent="비밀번호가 일치하지 않습니다."
        placeholder="비밀번호 확인"
        required
      />
    </div>
  );
};

export default Password;
