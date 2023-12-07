"use client";

import { useState } from "react";

import Input from "@/ui/input";
import { Title } from "@/ui/fonts";
import { BtnActive } from "@/ui/buttons";

interface Props {
  password: string;
  onChangePassword: (e: string) => void;
  onMutate: () => void;
}

const Password = ({ password, onChangePassword, onMutate }: Props) => {
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleChangePassword = () => {
    if (password !== passwordConfirm) return alert("비밀번호가 서로 다릅니다.");
    onMutate();
  };

  return (
    <div className="w-full sm:max-w-[500px]">
      <div className="mb-3">
        <Title level="sub3">비밀번호</Title>
      </div>
      <Input
        height="44px"
        value={password}
        onChange={(e) => onChangePassword(e.target.value)}
        type="password"
        placeholder="비밀번호"
        required
        className="mb-3"
      />
      <Input
        height="42px"
        value={passwordConfirm}
        type="password"
        onChange={(e) => setPasswordConfirm(e.target.value)}
        placeholder="비밀번호 확인"
        required
      />
      <BtnActive
        height="56px"
        type="button"
        $active={!!password && !!passwordConfirm}
        disabled={!password || !passwordConfirm}
        onClick={handleChangePassword}
        className="mt-12 sm:mt-6"
      >
        완료
      </BtnActive>
    </div>
  );
};

export default Password;
