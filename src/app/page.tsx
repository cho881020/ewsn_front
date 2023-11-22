"use client";

import Image from "next/image";

import flag from "@/assets/main/flag.png";
import { Container } from "@/components/atoms";
import Nav from "@/components/organisms/Nav";
import Board from "@/components/templates/main/Board";
import Banner from "@/components/templates/banner";
import ImageContainer from "@/components/templates/main/ImageContainer";

const Home = () => {
  return (
    <>
      <Nav />
      <Container>
        <ImageContainer />
        <div className="w-full flex justify-end">
          <Image src={flag} alt="" className="my-10" />
        </div>
        <Banner />
        <Board />
      </Container>
    </>
  );
};

export default Home;
