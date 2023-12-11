"use client";

import { useState } from "react";

import useCheckNickName from "@/apis/mutations/useCheckNickName";

import { Title } from "@/ui/fonts";
import { BtnActive } from "@/ui/buttons";

import ValidationInput from "@/components/molecules/ValidationInput";

interface Props {
  value: string;
  onChange: (e: string) => void;
  validation: boolean;
  onChangeValidation: (e: boolean) => void;
}

const Nickname = ({
  value,
  onChange,
  validation,
  onChangeValidation,
}: Props) => {
  const [isCheckNickname, setIsCheckNickname] = useState(false);

  const { mutate } = useCheckNickName({
    onSuccess: () => {
      setIsCheckNickname(true);
      onChangeValidation(true);
    },
    onError: () => {
      setIsCheckNickname(true);
      onChangeValidation(false);
    },
  });

  return (
    <>
      <Title level="sub3">닉네임</Title>
      <div className="flex gap-3">
        <ValidationInput
          success={isCheckNickname && validation}
          successContent="사용 가능한 닉네임 입니다."
          failure={isCheckNickname && !validation}
          failureContent="중복된 닉네임 입니다."
          value={value}
          placeholder="닉네임"
          onChange={(e: string) => onChange(e)}
          required
          maxLength={15}
        />
        <BtnActive
          $middle
          width="80px"
          height="44px"
          type="button"
          $active={!!value}
          onClick={() => value && mutate({ nickName: value })}
        >
          중복확인
        </BtnActive>
      </div>
    </>
  );
};

export default Nickname;
