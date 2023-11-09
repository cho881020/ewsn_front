"use client";

import Image from "next/image";

import main from "@/assets/main/main.png";
import flag from "@/assets/main/flag.png";
import Board from "@/components/templates/main/Board";
import { Container } from "@/components/atoms";
import Banner from "@/components/templates/banner";

const Home = () => {
  return (
    <Container>
      <Image src={main} alt="" />
      <div className="w-full flex justify-end">
        <Image src={flag} alt="" className="my-10" />
      </div>
      <Banner />
      <Board />
    </Container>
  );
};

export default Home;
