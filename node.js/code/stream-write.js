const fs = require("fs");
const data = "www.nodejs.org的教程";
// 创建一个可以写入的流，写入到文件output.txt中
const writeStream = fs.createWriteStream("output.txt");
// 使用utf8编码写入数据
writeStream.write(data,'UTF8');
// 标记文件末尾
writeStream.end();
// 处理流事件 --> finish、error
writeStream.on("finish",function(){
    console.log("写入完成。");
});
// 流错误处理
writeStream.on("error",function(err){
    console.log(err.stack);
});