"use strict";

const { Server } = require("socket.io");
const PORT = process.env.PORT || 3001;

const io = new Server(PORT);

let caps = io.of("/caps");

function logEvent(eventName, payload) {
  console.log(
    `
  EVENT: {
    event: ${eventName};
    time: ${new Date(Date.now()).toDateString()},
    payload:`,
    payload
  );
}

/* This code block is creating an event listener for the "connection" event on the "caps" namespace.
When a client connects to the "caps" namespace, the callback function is executed with the "socket"
object representing the client's connection. */
caps.on("connection", (socket) => {
  console.log("Connect to nameSpace", socket.id);

 /* This code block is creating an event listener for the "join-group" event on the "caps" namespace.
 When a client emits a "join-group" event with a payload containing a "store" property, the callback
 function is executed with the "socket" object representing the client's connection. The function
 then joins the client to a room with the name of the "store" property in the payload, using the
 "socket.join()" method. Finally, it logs a message to the console indicating that the client has
 connected to the room. This allows the client to receive messages specific to that room, such as
 "in-transit" and "delivered" events for deliveries associated with that store. */
  socket.on("join-group", (payload) => {
    socket.join(payload["store"]);
    console.log(`Connect to room, `, payload)
  });
  socket.on("pickup", (payload) => {
    socket.broadcast.emit("pickup", payload);
    logEvent("pickup", payload);
  });

  socket.on("in-transit", (payload) => {
    socket.to(payload.store).emit("in-transit", payload);
    logEvent("in-transit", payload);
  });

  socket.on("delivered", (payload) => {
    socket.to(payload.store).emit("delivered", payload);
    logEvent("delivered", payload);
  });
});
