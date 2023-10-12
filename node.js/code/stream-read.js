const fs = require("fs");
var data= "";

// 创建可读流
const reader = fs.createReadStream("test.txt");

// 设置编码为 utf8
reader.setEncoding("UTF8");

// 处理流事件 -->data,end, and error
reader.on("data",function(chunk){
    data += chunk;
});

// 流事件结束
reader.on("end",function(){
    console.log(data);
});

// 错误处理
reader.on("error",function(err){
    console.log(err.stack);
});