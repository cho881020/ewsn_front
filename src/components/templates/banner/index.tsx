import Image from "next/image";
import styled from "styled-components";

import banner1 from "@/assets/temp/banner1.png";
import banner2 from "@/assets/temp/banner2.png";

const Banner = ({ mt }: { mt?: string }) => {
  return (
    <BannerContainer $mt={mt}>
      <Image src={banner1} alt="" />
      <Image src={banner2} alt="" />
    </BannerContainer>
  );
};
const BannerContainer = styled.div<{ $mt?: string }>`
  display: flex;
  gap: 20px;
  margin-top: ${({ $mt }) => $mt && $mt};
  margin-bottom: 40px;
  max-width: 100%;
  img {
    width: 580px;
    max-width: calc(50% - 10px);
  }
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    margin-bottom: 20px;
    img {
      max-width: 100%;
    }
  }
`;

export default Banner;
