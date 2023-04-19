'use strict'

const { io } = require('socket.io-client');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001';
const { sendPickup, handleDelivered, generatePayload } = require('./handler');

let caps = io(SERVER_URL + '/caps');

caps.on('delivered', handleDelivered);

sendPickup(caps, generatePayload());
