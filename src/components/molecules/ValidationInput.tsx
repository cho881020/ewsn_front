import Image from "next/image";
import styled from "styled-components";

import iconFalse from "@/assets/common/false.png";
import iconSuccess from "@/assets/common/sucess.png";

import Input from "@/ui/input";
import COLORS from "@/ui/colors";
import { Content } from "@/ui/fonts";

interface Props {
  success?: boolean;
  failure?: boolean;
  successContent?: string;
  failureContent?: string;
  value: string;
  onChange: (e: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

const ValidationInput = ({
  success,
  failure,
  successContent,
  failureContent,
  value,
  onChange,
  placeholder,
  type,
  required,
}: Props) => {
  const isValidation = success || failure;

  return (
    <Container>
      <Wrap $success={success} $failure={failure}>
        <Input
          type={type || "text"}
          $maxWidth="90%"
          height="42px"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          $noneBorder
          required={required}
        />
        {isValidation && (
          <Image src={success ? iconSuccess : iconFalse} alt="" />
        )}
      </Wrap>
      {isValidation && (
        <Content level="body1" color={success ? COLORS.BLUE : COLORS.RED}>
          {success ? successContent : failureContent}
        </Content>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  p {
    padding: 2px 0 0 8px;
  }
`;
const Wrap = styled.div<{ $success?: boolean; $failure?: boolean }>`
  outline: none;
  height: 44px;
  background: #fff;
  border: ${({ $success, $failure }) =>
    `1px solid ${
      $success ? COLORS.BLUE : $failure ? COLORS.RED : COLORS.LINE03
    };`};
  border-radius: 4px;
  color: ${COLORS.TEXT01};
  position: relative;
  img {
    position: absolute;
    right: 12px;
    top: 14px;
  }
`;

export default ValidationInput;
