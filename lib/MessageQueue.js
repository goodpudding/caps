'use strict';

class MessageQueue {
  constructor() {
    this.data = {};
  }

  store(key, value) {
    if (!this.data[key]) {
      this.data[key] = [];
    }
    this.data[key].push(value);
    return key;
  }

  read(key) {
    const value = this.data[key] || []; 
    delete this.data[key];
    return value;
  }

  remove(key) {
    let value = this.data[key];
    delete this.data[key];
    return value;
  }
}

module.exports = MessageQueue;
