"use client";

import { ReactNode, useEffect, useState } from "react";

import api from "@/apis/client";
import instance from "@/apis/client";
import { useSetRecoilState } from "recoil";
import authAtom from "@/stores/authState";

interface Props {
  children: ReactNode;
}

const TokenCheck = ({ children }: Props) => {
  const [checked, setChecked] = useState(false);
  const setAuth = useSetRecoilState(authAtom);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = localStorage.getItem("TOKEN");
      if (!token) return;

      const result = await instance.get("posting", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (result) {
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
        setAuth({ isLogin: true });
      }
    } catch {
      localStorage.removeItem("TOKEN");
      setAuth({ isLogin: false });
    } finally {
      setChecked(true);
    }
  };

  if (!checked) return <></>;

  return <>{children}</>;
};

export default TokenCheck;
