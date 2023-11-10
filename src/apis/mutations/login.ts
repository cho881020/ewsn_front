import { AxiosError } from "axios";
import { instance } from "@/apis/client";

const login = async (params: { email: string; password: string }) => {
  try {
    const result = await instance.post("/auth/logIn", params);
    return result.data;
  } catch (error) {
    const { response } = error as AxiosError;
    return response?.data;
  }
};

export default login;
