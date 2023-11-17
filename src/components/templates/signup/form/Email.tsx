"use client";

import { useState } from "react";

import { Title } from "@/ui/fonts";
import { BtnActive } from "@/ui/buttons";

import ValidationInput from "@/components/molecules/ValidationInput";

interface Props {
  value: string;
  onChange: (e: string) => void;
}

const Email = ({ value, onChange }: Props) => {
  const [isPostEmail, setIsPostEmail] = useState(false);

  return (
    <>
      <Title level="sub3">이메일 주소</Title>
      <div className="flex gap-3 mb-3">
        <ValidationInput
          success={isPostEmail}
          successContent="인증 번호가 발송 되었습니다."
          value={value}
          placeholder="이메일"
          onChange={(e: string) => onChange(e)}
          required
        />
        <BtnActive
          $middle
          width="80px"
          height="44px"
          type="button"
          $active={!!value}
          onClick={() => value && setIsPostEmail(true)}
        >
          {isPostEmail ? "재전송" : "인증"}
        </BtnActive>
      </div>
    </>
  );
};

export default Email;
