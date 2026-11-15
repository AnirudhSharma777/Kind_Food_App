import axios from "axios";
import { BASE_URL } from "./apis";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const apiConnector = (method, url, bodyData, headers = {}, params) => {
  return axiosInstance({
    method,
    url,
    data: bodyData,
    headers,
    params,
  });
};
