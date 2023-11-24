"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import DATAS from "@/datas/Nav";
import authState from "@/stores/authState";

import logo from "@/assets/nav/logo.png";

import COLORS from "@/ui/colors";
import { Content } from "@/ui/fonts";

const Nav = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isLogin, nickName } = useRecoilValue(authState);
  const selectCamp = Number(searchParams.get("camp")) || null;

  const handleLogout = () => {
    delete localStorage.TOKEN;
    window.location.href = "/";
  };

  return (
    <>
      <Wrapper>
        <Container>
          <div className="flex items-center gap-7">
            <Link href="/">
              <Image src={logo} alt="" className="cursor-pointer" />
            </Link>
            {pathname === "/" ? (
              <Content level="cap2" color="#fff">
                정치인이 운영하지 않는 정치 커뮤니티
              </Content>
            ) : (
              <CampContainer>
                {DATAS.map(({ id, btn, activeBtn, camp }) => {
                  const isHot = searchParams.has("hot");
                  const query = camp
                    ? `camp=${camp}&page=1`
                    : `${isHot ? "hot=&" : ""}&page=1`;
                  return (
                    <Btn
                      key={id}
                      $active={(selectCamp || 0) === id}
                      href={{ pathname: "/board", query }}
                    >
                      {(selectCamp || 0) === id ? activeBtn : btn}
                    </Btn>
                  );
                })}
              </CampContainer>
            )}
          </div>
          <div className="flex gap-3 items-center text-sm font-bold">
            {isLogin ? (
              <>
                <button className="text-white">{nickName}</button>
                <Line />
                <button className="text-white" onClick={handleLogout}>
                  로그아웃
                </button>
              </>
            ) : (
              <button
                className="text-white"
                onClick={() => (window.location.href = "/login")}
              >
                로그인
              </button>
            )}
          </div>
        </Container>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.header`
  background: ${COLORS.PRIMARY};
`;

const Container = styled.div`
  max-width: 1220px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  color: #fff;
  padding: 0 20px;
`;

const Line = styled.div`
  width: 1px;
  height: 12px;
  background-color: #fff;
`;

const CampContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const Btn = styled(Link)<{ $active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 24px;
  border-radius: 4px;
  background-color: ${({ $active }) => $active && "#fff"};
`;

export default Nav;
