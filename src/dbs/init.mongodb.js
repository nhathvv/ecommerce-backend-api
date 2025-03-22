"use strict";
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/shopDEV";
const { countConnect, checkOverload } = require("../helpers/check.connect");

class Database {
  constructor() {
    this.connect();
  }
  // connect()
  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(url, { maxPoolSize: 50 })
      .then(() => {
        countConnect();
        // checkOverload();
        console.log("Connectd Mongodb success!");
      })
      .catch((err) => console.log(`Error connected`));
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
