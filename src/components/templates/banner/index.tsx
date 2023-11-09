import Image from "next/image";
import styled from "styled-components";

import banner1 from "@/assets/temp/banner1.png";
import banner2 from "@/assets/temp/banner2.png";

const Banner = () => {
  return (
    <BannerContainer>
      <Image src={banner1} alt="" />
      <Image src={banner2} alt="" />
    </BannerContainer>
  );
};
const BannerContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  max-width: 100%;
  img {
    width: 580px;
    max-width: calc(50% - 10px);
  }
`;

export default Banner;
