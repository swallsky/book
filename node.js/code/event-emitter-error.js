const events = require("events");
const emitter = new events.EventEmitter();

// emitter.on("error",function(err){
//     console.error(err);
// });

emitter.emit("error");