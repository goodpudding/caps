"use strict";

const { Server } = require("socket.io");
const PORT = process.env.PORT || 3001;

const io = new Server(PORT);

io.on("connection", (socket) => {
  console.log("CLIENT HAS CONNECTED", socket.id);
  const logEvent = (eventName) => (payload) => {
    console.log(`
    EVENT: {
      event: ${eventName};
      time: ${new Date()},
      payload:`, payload 
    );}
  io.on("pickup", logEvent("pickup"));
  
  socket.on("pickup", (payload) => {
    socket.broadcast.emit("pickup", payload);
  });
});

let caps = io.of('/caps');


caps.on('connection', (socket) => {
  console.log('CLIENT CONNECTED TO ORDER READY', socket.id);
  
  const logEvent = (eventName) => (payload) => {
    console.log(`
    EVENT: {
      event: ${eventName};
      time: ${new Date()},
      payload:`, payload 
    );
  };
  
  
  socket.on('orderRoom', (payload) => {
    caps.emit('orderRoom', payload);
  })
  
caps.on("in-transit", logEvent('in-transit'));

caps.on("delivered", logEvent('delivered'));
})
