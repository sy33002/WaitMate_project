import { io } from 'socket.io-client';

const socket = io(`https://sesac-projects.site/`, {
  path : 'wapi/socket.io'
});

export { socket };
