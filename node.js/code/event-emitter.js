// 引入events内置模块
const events = require("events");
// 创建一个eventEitter对象
const eventEmitter = new events.EventEmitter();

// 创建事件处理程序
const connectHandler = function connected(){
    console.log("连接成功");

    // 解发另一个数据获取处理事件
    eventEmitter.emit("data_received");
};

// 绑定一个connect事件处理程序
eventEmitter.on("connect",connectHandler);

// 使用匿名函数版定 data_received事件
eventEmitter.on("data_received",function(){
    console.log("数据接收成功。");
});

// 触发connect事件
eventEmitter.emit("connect");

console.log("end");