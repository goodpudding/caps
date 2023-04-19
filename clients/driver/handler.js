'use strict';

const { io } = require('socket.io-client');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001';
let caps = io(SERVER_URL + '/caps');

function handlePickup(payload){
  console.log(`DRIVER: picked up ${payload.orderId}`);

  caps.emit('in-transit', payload);

  console.log(`DRIVER: delivered ${payload.orderId}`);

  caps.emit('delivered', payload);
}

module.exports = handlePickup;