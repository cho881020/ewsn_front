"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import east from "@/assets/main/east.png";
import west from "@/assets/main/west.png";
import center from "@/assets/main/center.png";
import sourth from "@/assets/main/sourth.png";
import north from "@/assets/main/north.png";

const ImageContainer = () => {
  const router = useRouter();

  return (
    <Container>
      <Image
        src={north}
        alt=""
        onClick={() => router.push("/board?camp=north&page=1")}
      />
      <div className="flex gap-5">
        <Image
          src={west}
          alt=""
          onClick={() => router.push("/board?camp=west&page=1")}
        />
        <Image
          src={center}
          alt=""
          onClick={() => router.push("/board?camp=center&page=1")}
        />
        <Image
          src={east}
          alt=""
          onClick={() => router.push("/board?camp=east&page=1")}
        />
      </div>
      <Image
        src={sourth}
        alt=""
        onClick={() => router.push("/board?camp=sourth&page=1")}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  img {
    cursor: pointer;
  }
`;

export default ImageContainer;
