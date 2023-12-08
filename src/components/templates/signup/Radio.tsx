import Image from "next/image";
import styled from "styled-components";

import radio from "@/assets/signup/radio.png";
import radioActive from "@/assets/signup/radioActive.png";
import COLORS from "@/ui/colors";
import { Content } from "@/ui/fonts";

interface Props {
  politicalOrientationId: number;
  onChangePoliticalOrientationId: (e: number) => void;
}
const Radio = ({
  politicalOrientationId,
  onChangePoliticalOrientationId,
}: Props) => {
  return (
    <Container>
      <Wrap>
        <Item onClick={() => onChangePoliticalOrientationId(4)}>
          <Image
            src={politicalOrientationId === 4 ? radioActive : radio}
            alt=""
          />
          <Content
            color={politicalOrientationId !== 4 ? COLORS.TEXT02 : "#000"}
          >
            북 - 자유주의
          </Content>
        </Item>
      </Wrap>
      <Wrap>
        <Item onClick={() => onChangePoliticalOrientationId(2)}>
          <Image
            src={politicalOrientationId === 2 ? radioActive : radio}
            alt=""
          />
          <Content
            color={politicalOrientationId !== 2 ? COLORS.TEXT02 : "#000"}
          >
            서 - 보수주의
          </Content>
        </Item>
        <Item onClick={() => onChangePoliticalOrientationId(5)}>
          <Image
            src={politicalOrientationId === 5 ? radioActive : radio}
            alt=""
          />
          <Content
            color={politicalOrientationId !== 5 ? COLORS.TEXT02 : "#000"}
          >
            중 - 중도주의
          </Content>
        </Item>
        <Item onClick={() => onChangePoliticalOrientationId(1)}>
          <Image
            src={politicalOrientationId === 1 ? radioActive : radio}
            alt=""
          />
          <Content
            color={politicalOrientationId !== 1 ? COLORS.TEXT02 : "#000"}
          >
            동 - 진보주의
          </Content>
        </Item>
      </Wrap>
      <Wrap>
        <Item onClick={() => onChangePoliticalOrientationId(3)}>
          <Image
            src={politicalOrientationId === 3 ? radioActive : radio}
            alt=""
          />
          <Content
            color={politicalOrientationId !== 3 ? COLORS.TEXT02 : "#000"}
          >
            남 - 권위주의
          </Content>
        </Item>
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  width: 375px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
  @media (max-width: 768px) {
    width: 335px;
    gap: 20px;
  }
`;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  @media (max-width: 768px) {
    gap: 4px;
  }
`;

const Item = styled.div`
  display: flex;
  gap: 4px;
  cursor: pointer;
`;

export default Radio;
