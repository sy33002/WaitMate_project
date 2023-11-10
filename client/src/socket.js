import { io } from 'socket.io-client';

const socket = io(`https://sesac-projects.site/wapi`);

export { socket };
