'use strict';

const { emitter, eventPool } = require('../eventPool.js');

emitter.emit(eventPool[0], { packageReadyForPickup: true });

