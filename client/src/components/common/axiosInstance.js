import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://sesac-projects.site/wapi',
  withCredentials: true
});

