import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";

import close from "@/assets/report/close.png";
import warning from "@/assets/report/warning.png";
import radio from "@/assets/report/radio.png";
import checekd from "@/assets/report/radioChecked.png";

import Input from "@/ui/input";
import COLORS from "@/ui/colors";
import { Btn } from "@/ui/buttons";
import { Content, Title } from "@/ui/fonts";

import { Backdrop, Container } from "@/components/atoms/modal";

interface Props {
  onClose: () => void;
  onReport: () => void;
  reason: string;
  onChangeReason: (e: string) => void;
}

const REASONS = [
  { id: 1, content: "관련성" },
  { id: 2, content: "폭언/욕설" },
  { id: 3, content: "허위사실" },
  { id: 4, content: "불편함, 불쾌감을 줄 수 있는 내용" },
  { id: 5, content: "홍보물" },
  { id: 6, content: "갈등 유발, 선동" },
  { id: 7, content: "도배" },
  { id: 8, content: "기타" },
];

const ModalReport = ({ reason, onChangeReason, onClose, onReport }: Props) => {
  const [reasonId, setReasonId] = useState(0);
  const handleReport = () => {
    if (!reasonId) return alert("신고 사유를 선택해주세요.");
    if (reasonId === 8 && !reason) return alert("신고 사유를 입력해주세요.");
    onReport();
    onClose();
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    reasonId === 8
      ? onChangeReason("")
      : onChangeReason(REASONS[reasonId - 1]?.content);
  }, [reasonId]);

  return (
    <>
      <Backdrop onClick={handleClick} />
      <Container $width="400px">
        <TitleWrap>
          <Title level="head1" color="#000">
            신고사유
          </Title>
          <Image src={close} alt="close" onClick={onClose} />
        </TitleWrap>

        <div className="py-5 px-6">
          <div className="flex gap-1 items-center">
            <Image src={warning} alt="waring" />
            <Title level="sub3" color="#000">
              허위 신고는 이용 정지의 사유가 됩니다.
            </Title>
          </div>
          <ul className="mb-2">
            {REASONS.map(({ id, content }) => (
              <li
                className="mt-4 flex gap-1 cursor-pointer"
                onClick={() => setReasonId(id)}
              >
                <Image src={reasonId === id ? checekd : radio} alt="radio" />
                <Content color={COLORS.TEXT02}>{content}</Content>
              </li>
            ))}
          </ul>
          <Input
            placeholder="기타 사유 입력"
            height="52px"
            value={reasonId === 8 ? reason : ""}
            onChange={(e) => onChangeReason(e.target.value)}
          />
        </div>
        <CustomBtn onClick={handleReport}>신고하기</CustomBtn>
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

export default ModalReport;
