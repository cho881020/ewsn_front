import Image from "next/image";
import styled from "styled-components";

import banner1 from "@/assets/temp/banner1.png";

const Banner = () => {
  return (
    <BannerContainer>
      <Image src={banner1} alt="" />
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  margin-bottom: 40px;
  img {
    width: 100%;
    max-height: 90px;
  }
  @media (max-width: 768px) {
    margin-bottom: 20px;
    img {
      max-width: 100%;
    }
  }
`;

export default Banner;
