const events = require("events");
const eventEmitter = new events.EventEmitter();

eventEmitter.on("someEvent",function(arg1,arg2){
    console.log("listener1",arg1,arg2);
});

eventEmitter.emit("someEvent","arg1参数","arg2参数");