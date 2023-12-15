import Link from "next/link";
import styled from "styled-components";

import { Ad } from "@/types/ad";

interface Props {
  ads: Ad[];
  politicalOrientationId: number | null;
}

const Banner = ({ ads, politicalOrientationId }: Props) => {
  const banner =
    politicalOrientationId === null
      ? ads[8]
      : ads[11 - (politicalOrientationId + 3)];

  return (
    <BannerContainer>
      <Link href={banner.link} target="_blank">
        <Img src={banner.image} alt="" />
      </Link>
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  margin-bottom: 40px;
  a {
    width: 100%;
    max-height: 90px;
  }
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

export default Banner;
