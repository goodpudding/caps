

const { io } = require('socket.io-client');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001';
let generalSocket = io(SERVER_URL);

const handlePickup = require('./handler');



generalSocket.on('pickup', handlePickup);