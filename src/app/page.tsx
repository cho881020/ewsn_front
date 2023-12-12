"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import flag from "@/assets/main/flag.png";
import { Container } from "@/components/atoms";
import Nav from "@/components/organisms/Nav";
import Footer from "@/components/organisms/Footer";
import Board from "@/components/templates/main/Board";
import Banner from "@/components/templates/main/Banner";
import ImageContainer from "@/components/templates/main/ImageContainer";

const Home = () => {
  const router = useRouter();

  return (
    <>
      <Nav />
      <Layout>
        <ImageContainer />
        <div className="w-full flex justify-end sm:mb-5">
          <Image
            src={flag}
            alt=""
            className="my-10 cursor-pointer sm:my-0 sm:w-10"
            onClick={() => router.push("/flag")}
          />
        </div>
        <Banner />
        <Board />
      </Layout>
      <Footer />
    </>
  );
};

const Layout = styled(Container)`
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export default Home;
