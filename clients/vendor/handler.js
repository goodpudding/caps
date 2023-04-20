"use strict";

const Chance = require("chance");
const chance = new Chance();

module.exports = {
  sendPickup: function (socket, payload) {
    socket.emit('pickup', payload);
    console.log('sending pickup', payload);
  },
  generatePayload: function () {
    console.log('generating payload');
    const stores = ['1-800-flowers', 'acme-widgets'];
    const selectedStore = chance.pickone(stores);
    return {
      store: selectedStore,
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  },  
  handleDelivered: function (payload) {
    console.log(`Thank you, `, payload["customer"]);
  },

  handleMissedDeliveries: function (missedNotifications) {
    console.log('Handling missed delivered notifications...');
    for (const payload of missedNotifications) {
      this.handleDelivered(payload);
    }
  }
};
