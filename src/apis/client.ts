import axios from "axios";

const baseURL =
  "http://ewsn-load-balancer-628279436.ap-northeast-2.elb.amazonaws.com/";

const api = axios.create({ baseURL });

export const instance = axios.create({ baseURL });

export default api;
