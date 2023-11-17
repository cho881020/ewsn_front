import axios from "axios";

const baseURL = "https://api.동서남북.net/";

const api = axios.create({ baseURL });

export const instance = axios.create({ baseURL });

export default api;
