"use client";

import { useEffect, useState } from "react";

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
  const [newNickname, setNewNickname] = useState(value);

  const { mutate } = useCheckNickName({
    onSuccess: () => {
      setIsCheckNickname(true);
      onChangeValidation(true);
      onChange(newNickname);
    },
    onError: () => {
      setIsCheckNickname(true);
      onChangeValidation(false);
    },
  });

  const handleChange = (e: string) => {
    setIsCheckNickname(false);
    onChangeValidation(false);
    setNewNickname(e);
  };

  useEffect(() => {
    setNewNickname(value);
  }, [value]);

  return (
    <>
      <Title level="sub3">닉네임</Title>
      <div className="flex gap-3">
        <ValidationInput
          success={isCheckNickname && validation}
          successContent="사용 가능한 닉네임 입니다."
          failure={isCheckNickname && !validation}
          failureContent="중복된 닉네임 입니다."
          value={newNickname}
          placeholder="닉네임"
          onChange={(e: string) => handleChange(e)}
          required
        />
        <BtnActive
          $middle
          width="80px"
          height="44px"
          type="button"
          $active={newNickname !== value && !!newNickname}
          onClick={() => mutate({ nickName: newNickname })}
        >
          중복확인
        </BtnActive>
      </div>
    </>
  );
};

export default Nickname;
