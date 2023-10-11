const events = require("events");
const eventEmitter = new events.EventEmitter();

// 监听器 #1
const listener1 = function listener1(){
    console.log("监听器 listener1");
}

// 监听器 #1
const listener2 = function listener2(){
    console.log("监听器 listener2");
}

// 绑定 connect事件，处理函数为 listener1
eventEmitter.addListener("connect",listener1);

// 绑定 connect事件，处理函数为 listener2
eventEmitter.on("connect",listener2);

// 查看 connect 监听器数量
const eventListeners = eventEmitter.listenerCount("connect");
console.log(eventListeners + "个监听器监听连接事件。");

// 触发 connect 事件
eventEmitter.emit("connect");

// 移除绑定的 listener1 函数
eventEmitter.removeListener("connect",listener1);
console.log(" listener1 已被移除，不再监听 ");

// 触发 connect 事件
eventEmitter.emit("connect");

// 查看新的监听个数
const eventListeners2 = eventEmitter.listenerCount("connect");
console.log(eventListeners2 + "个监听器监听连接事件。");

