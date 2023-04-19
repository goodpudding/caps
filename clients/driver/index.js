const { io } = require('socket.io-client');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001';
let caps = io(SERVER_URL + '/caps');

const { handlePickup } = require('./handler');

caps.on('connect', () => {
  console.log('Connected to the server');
  const store1 = '1-800-flowers';
  caps.emit('join-group', { store: store1 });
  caps.emit('pickupMessages', { store: store1 });
  const store2 = 'acme-widgets';
  caps.emit('join-group', { store: store2 });
  caps.emit('pickupMessages', { store: store2 });
});

caps.on('pickup', handlePickup);

caps.on('missedPickups', (missedOrders) => {
  console.log('Handling missed pickup orders...');
  for (const order of missedOrders) {
    handlePickup(order);
  }
});
