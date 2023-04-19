'use strict'

const { io } = require('socket.io-client');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001';
const { sendPickup, handleDelivered, generatePayload, handleMissedDeliveries } = require('./handler');

let caps = io(SERVER_URL + '/caps');

caps.on('connect', () => {
  console.log('Connected to the server');
  const store = '1-800-flowers';
  caps.emit('join-group', { store });
  caps.emit('deliveredMessages', { store });
});

caps.on('missedDeliveries', (missedNotifications) => {
  handleMissedDeliveries(missedNotifications);
});

caps.on('delivered', handleDelivered);

sendPickup(caps, generatePayload());
