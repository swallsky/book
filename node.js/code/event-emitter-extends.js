const EventEmitter = require("events");

class EvtDemo extends EventEmitter {};

const myEmitter = new EvtDemo();

myEmitter.on("myEvent",(args)=>{
    console.log("事件被触发，参数为:",args);
});

myEmitter.emit("myEvent","Hello World");