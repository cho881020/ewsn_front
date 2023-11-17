import { atom } from "recoil";

const authState = atom({
  key: "authState",
  default: {
    isLogin: false,
    nickName: "",
  },
});

export default authState;
