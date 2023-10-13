const http = require("http");
const url = require("url");
const querystring = require("querystring");

http.createServer(function(req,res){
    let urls = url.parse(req.url);
    let pathname = urls.pathname;
    console.log(pathname);
    let params = querystring.parse(urls.query);
    console.log(params);
    res.writeHead(200,{"Content-Type": "text/plain"});
    res.write(pathname);
    res.end();
}).listen(8888);