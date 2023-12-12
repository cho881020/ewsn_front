import styled from "styled-components";

import Link from "next/link";
import useAdQuery from "@/apis/queries/useAdQuery";

const Banner = ({ id }: { id: number }) => {
  const banner = useAdQuery(id);

  return (
    <BannerContainer>
      <Link href={banner?.link || ""} target="_blank">
        <Img src={banner?.image} alt="" />
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
