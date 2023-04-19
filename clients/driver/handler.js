const { io } = require('socket.io-client');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001';
let caps = io(SERVER_URL + '/caps');

module.exports = {
  handlePickup: function (payload) {
    caps.emit('join-group', payload["store"]);
    console.log('joined room');

    caps.emit('deliveredMessages', { store: payload["store"] });
    console.log(`DRIVER: picked up ${payload['orderId']} for ${payload['store']}`);
    caps.emit('in-transit', payload);

    console.log(`Order ${payload['orderId']} in transit`);

    caps.emit('delivered', payload);
  }
};

caps.on('missedDeliveries', (missedNotifications) => {
  console.log('Missed deliveries:', missedNotifications);
});
