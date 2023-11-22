"use client";

import { ReactNode, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

import api from "@/apis/client";
import instance from "@/apis/client";

import authAtom from "@/stores/authState";

interface Props {
  children: ReactNode;
}

const TokenCheck = ({ children }: Props) => {
  const setAuth = useSetRecoilState(authAtom);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = localStorage.getItem("TOKEN");
      if (!token) return;

      const result = await instance.get("user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (result) {
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
        setAuth({
          id: result.data.id,
          isLogin: true,
          nickName: result.data.nickName,
          politicalOrientationId: result.data.politicalOrientationId,
          isAdmin: result.data.isAdmin,
        });
      }
    } catch {
      localStorage.removeItem("TOKEN");
      setAuth({
        id: null,
        isLogin: false,
        nickName: "",
        politicalOrientationId: 0,
        isAdmin: false,
      });
    }
  };

  return <>{children}</>;
};

export default TokenCheck;
