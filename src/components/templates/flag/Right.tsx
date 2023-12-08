"use client";

import Image from "next/image";
import styled from "styled-components";

import COLORS from "@/ui/colors";
import logo from "@/assets/flag/logo.png";

const DATAS = [
  {
    id: 0,
    title: "시위대와 집회 참가자를 위한 초당파적 지원에 대한 우리의 약속 ",
    content:
      "사람들의 집단적 목소리로 변화가 촉발되는 세상에서 시위와 집회에 참여하는 것은 변화를 만드는 강력한 방법입니다. [동서남북]에서는 개인과 그룹이 이러한 중요한 운동에 참여할 수 있도록 열정적으로 돕고 있으며, 이들이 메시지를 확대하고 긍정적인 변화를 가져오는 데 필요한 지원과 자원을 확보하는 동시에 엄격한 정치적 중립을 유지하도록 보장하고 있습니다.",
  },
  {
    id: 1,
    title: "우리의 비당파적 사명 ",
    content:
      "우리의 사명은 단순하면서도 심오합니다. 정치적 성향이나 신념에 관계없이 자신의 목소리를 전달하려는 사람들에게 권한을 부여하고 지원하는 것입니다. 우리는 시위와 집회에 참여하는 것이 영감을 주고 도전이 될 수 있다는 것을 이해하며 정치적 문제에 있어서 중립을 유지하면서 모든 참가자에게 도움을 제공하기 위해 노력합니다.",
  },
  {
    id: 2,
    title: "중립성에 대한 우리의 약속 ",
    content:
      "우리는 정치적 입장을 취하지 않고도 변화를 주도하는 수단으로서 비폭력적이고 평화적인 시위의 힘을 굳게 믿습니다. 우리는 모든 참가자가 정치적 성향에 관계없이 평화로운 방법을 우선시하고 보다 포용적이고 정의로운 사회를 구축하기 위해 노력할 것을 권장합니다.",
  },
  {
    id: 3,
    title: "정치적 중립을 실천하는 데 동참해 주세요 ",
    content:
      "노련한 활동가이든 처음 시위하는 사람이든, 정치적 편견에서 벗어나 긍정적인 변화를 위해 목소리를 높이는 사람들을 지원하고 힘을 실어주는 우리의 사명에 여러분을 초대합니다. 우리는 함께라면 모든 목소리가 반영되고 모든 행동이 중요해지는 더 나은 세상을 만들 수 있습니다. \n \n[동서남북]에서 우리는 단순한 지지자 그 이상입니다. 우리는 정치적 중립을 유지하면서 보다 공평하고 정의로운 미래를 향한 여러분의 여정에 동맹입니다. 우리는 함께 역사의 흐름을 바꾸고 정치적 의제를 지지하지 않고도 우리가 소중히 여기는 가치를 반영하는 세상을 만들 수 있습니다. \n\n우리와 함께 일어서서 경청해 보세요. 우리는 정치적 중립에 대한 약속으로 단결되어 막을 수 없습니다. \n\n※신청서를 허위로 작성하여 동서남북 커뮤니티에 직접적인 손해가 발생할 경우 손해 배상 청구 예정",
  },
];

const Right = () => {
  return (
    <Container>
      <Image src={logo} alt="" className="mb-[60px] sm:hidden" />
      {DATAS.map(({ id, title, content }) => (
        <Article key={id}>
          <Title className="pl-[100px] flex gap-2 sm:pl-0">
            {title} <p className="sm:hidden">:</p>
          </Title>
          <Content>{content}</Content>
        </Article>
      ))}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1088px;
  padding: 40px 60px;
  min-height: calc(100vh - 60px);
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 768px) {
    padding: 0;
    min-height: fit-content;
    max-width: 100%;
  }
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: -0.01em;
  white-space: pre-line;
`;

const Content = styled.p`
  font-size: 20px;
  line-height: 30px;
  letter-spacing: -0.6px;
  color: ${COLORS.TEXT02};
  white-space: pre-line;
`;

export default Right;
