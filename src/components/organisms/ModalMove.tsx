import styled, { css } from "styled-components";

import COLORS from "@/ui/colors";
import { Btn } from "@/ui/buttons";
import { Content, Title } from "@/ui/fonts";
import { Backdrop, Container } from "@/components/atoms/modal";

interface Props {
  title: string;
  onClose: () => void;
  onDelete: () => void;
}

const ModalMove = () => {
  // const handleDelete = () => {
  //   onDelete();
  //   onClose();
  // };

  // const handleClick = (e: React.MouseEvent<HTMLElement>) => {
  //   if (e.currentTarget === e.target) {
  //     onClose();
  //   }
  // };

  return (
    <>
      <Backdrop />
      <Container>
        <Title level="head1" color="#000">
          삭제
        </Title>
        <Content
          level="body1l"
          color={COLORS.TEXT02}
          className="mt-[34px]"
        ></Content>
        <div className="flex mt-[42px]">
          <CustomBtn $gray>취소</CustomBtn>
          <CustomBtn>삭제</CustomBtn>
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

export default ModalMove;
