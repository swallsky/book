const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(function(request,response){
    //发送HTTP头部
    // HTTP状态值 200
    // 返回文本
    response.writeHead(200,{'Content-Type':'text/plain'});
    //发送响应数据
    response.end("Hello World\n");
});

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
});