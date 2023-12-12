import Link from "next/link";
import styled from "styled-components";

import useAdQuery from "@/apis/queries/useAdQuery";

const Banner = () => {
  const left = useAdQuery(1);
  const right = useAdQuery(2);

  if (!left || !right) return null;
  return (
    <BannerContainer>
      <Link href={left.link} target="_blank">
        <Img src={left.image} alt="" />
      </Link>
      <Link href={right.link} target="_blank">
        <Img src={right.image} alt="" />
      </Link>
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  max-width: 100%;
  a {
    width: 580px;
    max-width: calc(50% - 10px);
  }
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    margin-bottom: 20px;
    a {
      max-width: 100%;
    }
  }
`;

const Img = styled.img`
  width: 580px;
  height: 100%;
`;

export default Banner;
