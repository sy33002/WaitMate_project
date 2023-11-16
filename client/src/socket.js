import { io } from 'socket.io-client';

let socketInstance = null;
export const getSocket = () => {
  if (!socketInstance) {
    socketInstance = io(`http://localhost:8080`);
  }
  return socketInstance;
};
