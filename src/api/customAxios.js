import axios from "axios";

export const customAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
