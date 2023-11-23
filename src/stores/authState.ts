import { atom } from "recoil";

const authState = atom({
  key: "authState",
  default: {
    id: null,
    isLogin: false,
    nickName: "",
    politicalOrientationId: 0,
    isAdmin: false,
  },
});

export default authState;
