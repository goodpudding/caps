"use strict";

const { Server } = require("socket.io");
const PORT = process.env.PORT || 3001;
const MessageQueue = require('../lib/MessageQueue');
const io = new Server(PORT);

let caps = io.of("/caps");

let pickup = new MessageQueue();
let delivered = new MessageQueue();

function logEvent(eventName, payload) {
  console.log(
    `
  EVENT: {
    event: ${eventName};
    time: ${new Date().toDateString()},
    payload:`,
    payload,
    "}"
  );
}

caps.on("connection", (socket) => {
  console.log("Connect to nameSpace", socket.id);

  socket.on("join-group", (payload) => {
    socket.join(payload["store"]);
    console.log(`Connect to room, `, payload);
  });

  socket.on('pickupMessages', (payload) => {
    let message = pickup.read(payload.store);
    socket.emit('missedPickups', message);
  });

  socket.on('deliveredMessages', (payload) => {
    let message = delivered.read(payload.store);
    socket.emit('missedDeliveries', message);
  });

  socket.on("pickup", (payload) => {
    const clientsInRoom = caps.adapter.rooms.get(payload.store);
    if (!clientsInRoom || clientsInRoom.size === 0) {
      pickup.store(payload.store, payload);
    } else {
      socket.broadcast.emit("pickup", payload);
    }
    logEvent("pickup", payload);
  });

  socket.on("in-transit", (payload) => {
    socket.to(payload.store).emit("in-transit", payload);
    logEvent("in-transit", payload);
  });

  socket.on("delivered", (payload) => {
    const clientsInRoom = caps.adapter.rooms.get(payload.store);
    if (!clientsInRoom || clientsInRoom.size === 0) {
      delivered.store(payload.store, payload);
    } else {
      socket.to(payload.store).emit("delivered", payload);
    }
    logEvent("delivered", payload);
  });

  socket.on("error", (error) => {
    console.error("An error occurred:", error);
  });
});
