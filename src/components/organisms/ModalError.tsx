import styled from "styled-components";

import COLORS from "@/ui/colors";
import { Btn } from "@/ui/buttons";
import { Content, Title } from "@/ui/fonts";

import { Backdrop, Container } from "@/components/atoms/modal";

const ModalError = ({ onClose }: { onClose: () => void }) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <>
      <Backdrop onClick={handleClick} />
      <Container>
        <Title level="head1" color="#000">
          정치 성향 선택
        </Title>
        <Content level="body1l" color={COLORS.TEXT02} className="mt-[34px]">
          두 달의 기간이 지난 후 수정이 가능합니다.
        </Content>
        <CustomBtn onClick={onClose}>닫기</CustomBtn>
      </Container>
    </>
  );
};

const CustomBtn = styled(Btn)`
  margin-top: 42px;
  border-radius: 0;
  border: none;
  background-color: ${COLORS.RED};
  color: #fff;
`;

export default ModalError;
