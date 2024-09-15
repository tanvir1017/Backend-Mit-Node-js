const EventEmitter = require("events");
const myEmitter = new EventEmitter();

// Listening to the emitter

myEmitter.on("birthday", () => {
  console.log("HAPPY BIRTHDAY TO YOU!!");
});

myEmitter.on("birthday", () => {
  console.log("I will send you gift if you have birthday than,");
});

myEmitter.emit("birthday");
