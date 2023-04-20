

const { io } = require('socket.io-client');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001';
let caps = io(SERVER_URL + '/caps');

const { handlePickup } = require('./handler');



caps.on('pickup', handlePickup);