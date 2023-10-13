const http = require("http");
const events = require("events");

// 创建eventEmitter对象
const eventEmitter = new events.EventEmitter();

// route 根路径
eventEmitter.on("/",function(method,response){
    response.writeHead(200,{'Content-Type': 'text/plain'});
    response.end("Hello World");
});

// route 404
eventEmitter.on("404",function(method,url,response){
    response.writeHead(404,{'Content-Type': 'text/plain'});
    response.end("404 Not Found");
});

//启动服务
http.createServer(function(request,response){
    //打印当前的url
    console.log(request.url);
    // 分发事件
    if(eventEmitter.listenerCount(request.url)>0){
        eventEmitter.emit(request.url,request.method,response);
    }else{
        eventEmitter.emit("404",request.method,request.url,response);
    }
}).listen(8000);

console.log("Server running at http://127.0.0.1:8000");