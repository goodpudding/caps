"use strict";

const Chance = require("chance");
const chance = new Chance();

module.exports = {
  sendPickup: function (socket, payload) {
    socket.emit('pickup', payload);
    console.log('sending pickup', payload)
  },
  generatePayload: function () {
    console.log('generating payload')
    return {
      store: chance.company(),
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  },
  handleDelivered: function (payload) {
    console.log(`Thank you, `, payload["customer"]);
  },
};
