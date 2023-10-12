const fs = require("fs");
const zlib = require("zlib");
// 压缩 test.txt 为 test.txt.gz
fs.createReadStream("test.txt")
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream("test.txt.gz"));
