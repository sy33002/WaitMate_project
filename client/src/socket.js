import { io } from 'socket.io-client';

let socketInstance = null;
export const getSocket = () => {
  if (!socketInstance) {
    socketInstance = io(`https://sesac-projects.site/`, {
      path: '/wapi/socket.io',
      withCredentials : true,
    });
  }
  return socketInstance;
};
