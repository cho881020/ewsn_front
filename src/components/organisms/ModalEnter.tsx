import styled, { css } from "styled-components";

import COLORS from "@/ui/colors";
import { Btn } from "@/ui/buttons";
import { Content, Title } from "@/ui/fonts";

import { Backdrop, Container } from "@/components/atoms/modal";

interface Props {
  onClose: () => void;
  onEnter: () => void;
}

const ModalEnter = ({ onClose, onEnter }: Props) => {
  const handleEnter = () => {
    onEnter();
    onClose();
  };

  return (
    <>
      <Backdrop />
      <Container>
        <Title level="head1" color="#000">
          안내문
        </Title>
        <Content level="body1l" color={COLORS.TEXT02} className="mt-[34px]">
          이 글은 회원들의 신고 누적으로 <br />
          가려진 게시물입니다.
        </Content>
        <div className="flex mt-[42px]">
          <CustomBtn onClick={onClose} $gray>
            돌아가기
          </CustomBtn>
          <CustomBtn onClick={handleEnter}>보기</CustomBtn>
        </div>
      </Container>
    </>
  );
};

const CustomBtn = styled(Btn)<{ $gray?: boolean }>`
  border-radius: 0;
  border: none;
  min-width: 50%;
  ${({ $gray }) =>
    $gray &&
    css`
      background-color: ${COLORS.SECONDARY};
      color: ${COLORS.TEXT02};
    `}
`;

export default ModalEnter;
