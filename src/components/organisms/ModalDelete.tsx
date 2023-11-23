import styled, { css } from "styled-components";

import COLORS from "@/ui/colors";
import { Btn } from "@/ui/buttons";
import { Content, Title } from "@/ui/fonts";

interface Props {
  title: string;
  onClose: () => void;
  onDelete: () => void;
}

const ModalDelete = ({ title, onClose, onDelete }: Props) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

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
          삭제
        </Title>
        <Content level="body1l" color={COLORS.TEXT02} className="mt-[34px]">
          정말로 {title}을 삭제 하시겠습니까?
        </Content>
        <div className="flex mt-[42px]">
          <CustomBtn onClick={onClose} $gray>
            취소
          </CustomBtn>
          <CustomBtn onClick={handleDelete}>삭제</CustomBtn>
        </div>
      </Container>
    </>
  );
};

const Backdrop = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: #fff;
  z-index: 101;
  transform: translate(-50%, -50%);
  width: 335px;
  border-radius: 8px;
  box-shadow: 0px 4px 77px 0px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding-top: 24px;
  overflow: hidden;
`;

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

export default ModalDelete;
