import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import COLORS from "@/ui/colors";
import { Btn } from "@/ui/buttons";
import { Content } from "@/ui/fonts";
import flag from "@/assets/flag/blackFlag.png";

import { Backdrop, Container } from "@/components/atoms/modal";

const ModalFlag = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();

  const handleClose = () => {
    router.push("/");
    onClose();
  };
  return (
    <>
      <Backdrop />
      <Container>
        <div className="flex justify-center">
          <Image src={flag} alt="" width={28} height={28} />
        </div>
        <Content level="body1" color={COLORS.TEXT02} className="mt-6">
          신청 완료
        </Content>
        <CustomBtn onClick={handleClose}>확인</CustomBtn>
      </Container>
    </>
  );
};

const CustomBtn = styled(Btn)`
  margin-top: 48px;
  border-radius: 0;
  border: none;
`;

export default ModalFlag;
