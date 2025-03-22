"use strict";
const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const _SECONDS = 5000;
// count connections
const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log(`Number of connections:: ${numConnection}`);
};
// check overload
const checkOverload = () => {
  setInterval(() => {
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    const numConnection = mongoose.connections.length;
    // Example: maximum number of connections based on number of cores
    const maxConnections = numCores * 5;
    console.log(`Active connection:: ${numConnection}`);
    console.log(`numCores:: ${numCores}`);
    console.log(`Memory usage:: ${memoryUsage / 1024 / 1024} MB`);
    if (numConnection > maxConnections) {
      console.log(`Connection overload detected!`);
      // notify.send(...)
    }
  }, _SECONDS);
};
module.exports = {
  countConnect,
  checkOverload,
};
