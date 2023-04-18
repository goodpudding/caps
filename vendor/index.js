'use strict'

const eventEmitter = require('../eventPool');
const { handleDelivered, generatePayload } = require('./handler');


eventEmitter.on('delivered', handleDelivered)

eventEmitter.emit('pickup', generatePayload());