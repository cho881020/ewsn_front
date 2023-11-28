import styled from "styled-components";

import COLORS from "@/ui/colors";
import { Btn } from "@/ui/buttons";
import { Content, Title } from "@/ui/fonts";

import { Backdrop, Container } from "@/components/atoms/modal";

const ModalSuccess = ({ onClose }: { onClose: () => void }) => {
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
          신고 완료
        </Title>
        <Content level="body1l" color={COLORS.TEXT02} className="mt-[34px]">
          신고가 정상적으로 처리 되었습니다.
        </Content>
        <CustomBtn onClick={onClose}>확인</CustomBtn>
      </Container>
    </>
  );
};

const CustomBtn = styled(Btn)`
  margin-top: 42px;
  border-radius: 0;
  border: none;
`;

export default ModalSuccess;
