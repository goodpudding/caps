'use strict';

const Events = require('events');
const eventEmitter = new Events();

const eventPool = [
  'venderReadyEvent',
  'driverNotifiedEvent',
  'pickedUpEvent',
  'deliveredEvent',
  'vendorNotifiedEvent'
]

module.exports = {
  eventPool: eventPool,
  emitter: eventEmitter
}