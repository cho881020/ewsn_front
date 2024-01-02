import styled from "styled-components";

import { Btn } from "@/ui/buttons";

import { Backdrop, Container } from "@/components/atoms/modal";

interface Props {
  onClose: () => void;
}

const ModalPolicy = ({ onClose }: Props) => {
  return (
    <>
      <Backdrop />
      <CustomContainer>
        <iframe
          src="https://plip.kr/pcc/99987e74-c04c-4eb2-9899-0503557bcdb3/privacy/1.html"
          width="100%"
          height="380px"
        />
        <CustomBtn onClick={onClose}>확인</CustomBtn>
      </CustomContainer>
    </>
  );
};

const CustomContainer = styled(Container)`
  max-width: 90%;
  width: 500px;
  overflow-y: scroll;
  height: 500px;
`;

const CustomBtn = styled(Btn)`
  border-radius: 0;
  border: none;
  margin-top: 40px;
`;

export default ModalPolicy;
