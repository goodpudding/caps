'use strict'
const { io } = require('socket.io-client');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001';
let generalSocket = io(SERVER_URL);
let caps = io(SERVER_URL + '/caps');
const { handleDelivered, generatePayload } = require('./handler');


caps.on('delivered', handleDelivered)

generalSocket.emit('pickup', generatePayload());