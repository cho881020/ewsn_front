"use client";

import { useState } from "react";
import styled from "styled-components";

import Left from "@/components/templates/flag/Left";
import Header from "@/components/templates/flag/Header";
import ModalFlag from "@/components/organisms/ModalFlag";
import Right from "@/components/templates/flag/Right";
import Footer from "@/components/organisms/Footer";

const Flag = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <Header />
      <Layout>
        <Left openModal={() => setIsOpenModal(true)} />
        <Right />
        {isOpenModal && <ModalFlag onClose={() => setIsOpenModal(false)} />}
      </Layout>
      <Footer />
    </>
  );
};

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1220px) {
    flex-direction: column;
  }
  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

export default Flag;
