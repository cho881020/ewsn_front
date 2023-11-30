import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";

import usePatchPassword from "@/apis/mutations/usePatchPassword";

import Input from "@/ui/input";
import COLORS from "@/ui/colors";
import { Btn } from "@/ui/buttons";
import { Title } from "@/ui/fonts";
import close from "@/assets/report/close.png";

import { Backdrop, Container } from "@/components/atoms/modal";

const ModalPassword = ({ onClose }: { onClose: () => void }) => {
  const [state, setState] = useState({
    currentPassword: "",
    updatePassword: "",
    confirmPassword: "",
  });

  const { currentPassword, updatePassword, confirmPassword } = state;
  const { mutate } = usePatchPassword({
    currentPassword,
    updatePassword,
    onSuccess: () => onClose(),
  });

  const handleUpdate = () => {
    if (!currentPassword) return alert("현재 비밀번호를 입력해주세요.");
    if (!updatePassword) return alert("새 비밀번호를 입력해주세요.");
    if (!confirmPassword) return alert("새 비밀번호 확인을 입력해주세요.");
    if (updatePassword !== confirmPassword) {
      return alert("새 비밀번호가 맞지 않습니다.");
    }
    mutate();
  };
  return (
    <>
      <Backdrop />
      <Container $width="400px">
        <TitleWrap>
          <Title level="head1" color="#000">
            비밀번호 변경
          </Title>
          <Image src={close} alt="close" onClick={onClose} />
        </TitleWrap>
        <div className="py-5 px-6 flex flex-col gap-3">
          <Input
            type="password"
            value={currentPassword}
            autoComplete="new-password"
            onChange={(e) =>
              setState({ ...state, currentPassword: e.target.value })
            }
            placeholder="현재 비밀번호"
          />
          <Input
            type="password"
            value={updatePassword}
            autoComplete="new-password"
            onChange={(e) =>
              setState({ ...state, updatePassword: e.target.value })
            }
            placeholder="새 비밀번호"
          />
          <Input
            type="password"
            value={confirmPassword}
            autoComplete="new-password"
            onChange={(e) =>
              setState({ ...state, confirmPassword: e.target.value })
            }
            placeholder="새 비밀번호 확인"
          />
        </div>

        <CustomBtn onClick={handleUpdate} type="button">완료</CustomBtn>
      </Container>
    </>
  );
};

const CustomBtn = styled(Btn)`
  border-radius: 0;
  border: none;
`;

const TitleWrap = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  line-height: 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${COLORS.LINE02};
  img {
    position: absolute;
    cursor: pointer;
    right: 12px;
  }
`;

export default ModalPassword;
