import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'http://ec2-13-124-56-103.ap-northeast-2.compute.amazonaws.com:8080',
  withCredentials: true
});