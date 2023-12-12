import Link from "next/link";
import styled from "styled-components";

import useAdQuery from "@/apis/queries/useAdQuery";

const Banner = () => {
  const left = useAdQuery(10);
  const right = useAdQuery(11);

  if (!left || !right) return null;
  return (
    <BannerContainer>
      <Left href={left.link} target="_blank">
        <Img src={left.image} alt="" />
      </Left>
      <Right href={right.link} target="_blank">
        <Img src={right.image} alt="" />
      </Right>
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  display: flex;
  gap: 20px;
  max-width: 100%;
  padding: 0 24px;
  margin-top: 40px;
  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const Left = styled(Link)`
  width: 70%;
  height: 90px;
`;

const Right = styled(Link)`
  width: 30%;
  height: 90px;
`;

const Img = styled.img`
  width: 580px;
  height: 100%;
`;

export default Banner;
