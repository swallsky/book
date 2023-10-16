const fs = require("fs");

// 异步读取
fs.readFile("test.txt",function(err,data){
    if(err){
        return console.error(err);
    }
    console.log("异步读取："+data.toString());
});

// 同步读取
const data = fs.readFileSync("test.txt");
console.log("同步读取： "+ data.toString());