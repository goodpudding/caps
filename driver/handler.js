'use strict';

const { emitter, eventPool } = require('../eventPool');

// this is just waiting for other body parts to emit events
eventPool.forEach(event => {
  emitter.on(event, (payload) => {
    console.log('Package is ready for pickup', event, payload);
    emitter.emit('Package_Ready', payload);
  });
});
