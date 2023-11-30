"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import usePatchForgotPassword from "@/apis/mutations/usePatchForgotPassword";

import COLORS from "@/ui/colors";

import Header from "@/components/templates/findpw/Header";
import Email from "@/components/templates/findpw/Email";
import Password from "@/components/templates/findpw/Password";

const FindPassword = () => {
  const [page, setPage] = useState(0);
  const [state, setState] = useState({ email: "", password: "" });
  const router = useRouter();

  const { mutate } = usePatchForgotPassword({
    ...state,
    onSuccess: () => {
      alert("비밀번호가 변경되었습니다.");
      router.push("/login");
    },
  });

  return (
    <>
      <Header title={["비밀번호 찾기", "비밀번호 변경"][page]} />
      <Layout>
        <Container>
          {
            [
              <Email
                key={0}
                onMoveNextPage={() => setPage(1)}
                email={state.email}
                onChangeEmail={(e) => setState({ ...state, email: e })}
              />,
              <Password
                key={1}
                password={state.password}
                onChangePassword={(e) => setState({ ...state, password: e })}
                onMutate={() => mutate()}
              />,
            ][page]
          }
        </Container>
      </Layout>
    </>
  );
};

const Layout = styled.div`
  background-color: ${COLORS.BG};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  background: #ffffff;
  padding: 120px 60px;
  width: 580px;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default FindPassword;
