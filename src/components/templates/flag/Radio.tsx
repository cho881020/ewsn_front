import Image from "next/image";
import styled from "styled-components";

import radio from "@/assets/signup/radio.png";
import radioActive from "@/assets/signup/radioActive.png";
import COLORS from "@/ui/colors";
import { Content } from "@/ui/fonts";

interface Props {
  permission: string;
  onChangePermission: (e: string) => void;
}

const DATAS = [
  { id: 0, title: "승인" },
  { id: 1, title: "승인 대기중" },
  { id: 2, title: "신청 안함" },
];

const Radio = ({ permission, onChangePermission }: Props) => {
  return (
    <Container>
      {DATAS.map(({ id, title }) => (
        <Item key={id} onClick={() => onChangePermission(title)}>
          <Image src={permission === title ? radioActive : radio} alt="" />
          <Content color={COLORS.TEXT02}>{title}</Content>
        </Item>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 20px;
`;

const Item = styled.div`
  display: flex;
  width: 100px;
  gap: 4px;
  cursor: pointer;
`;

export default Radio;
