const fs = require("fs");

// 创建一个可读流
const readerStream = fs.createReadStream("test.txt");

// 创建一个可写流
const writerStream = fs.createWriteStream("output.txt");

// 管道读写操作 读取test.txt内容，并将内容写入到output.txt文件中
readerStream.pipe(writerStream);