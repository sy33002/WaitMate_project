import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'http://ec2-3-39-238-189.ap-northeast-2.compute.amazonaws.com:8080/',
  withCredentials: true
});