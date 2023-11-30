import styled, { css } from "styled-components";

import useDeleteUser from "@/apis/mutations/useDeleteUser";

import COLORS from "@/ui/colors";
import { Btn } from "@/ui/buttons";
import { Content, Title } from "@/ui/fonts";
import { Backdrop, Container } from "@/components/atoms/modal";

const ModalSignout = ({ onClose }: { onClose: () => void }) => {
  const { mutate } = useDeleteUser();

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
          회원탈퇴
        </Title>
        <Content level="body1l" color={COLORS.TEXT02} className="mt-4">
          정말로 탈퇴 하시겠습니까?
          <br /> 탈퇴 버튼 선택 시, <br />
          계정은 삭제 되며 복구 되지 않습니다.
        </Content>
        <div className="flex mt-6">
          <CustomBtn type="button" onClick={onClose} $gray>
            취소
          </CustomBtn>
          <CustomBtn type="button" onClick={() => mutate()}>
            탈퇴
          </CustomBtn>
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

export default ModalSignout;
