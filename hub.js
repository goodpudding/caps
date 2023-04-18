/*
The following user/developer stories detail the major functionality for this phase of the project.

As a vendor, I want to alert the system when I have a package to be picked up.
As a driver, I want to be notified when there is a package to be delivered.
As a driver, I want to alert the system when I have picked up a package and it is in transit.
As a driver, I want to alert the system when a package has been delivered.
As a vendor, I want to be notified when my package has been delivered.
And as developers, here are some of the development stories that are relevant to the above.

As a developer, I want to use industry standards for managing the state of each package.
As a developer, I want to create an event driven system so that I can write code that happens in response to events, in real time.
*/

'use strict';

const { emitter, eventPool } = require('./eventPool');

const state = {
  packageReadyForPickup:false,
  packageToBeDelivered: false,
  packagePickedUp: false,
  packageDelivere: false,
  vendorNotified: false,
  EVENT:{
    event: '',
    time: '',
    payload: {
      store: '',
      orderId: '',
      customer: '',
      address: '',
    }
  }

}

let venderReadyEvent = eventPool[0];
let driverNotifiedEvent = eventPool[1];
let pickedUpEvent = eventPool[2];
let deliveredEvent = eventPool[3];
let vendorNotifiedEvent = eventPool[4];

emitter.on('Package_Ready', (payload) => {
  let property = Object.keys(payload)[0];
  state[property] = payload[property];
  console.log('STATE', state);
})

require('./driver/handler');
require('./vendor/handler');