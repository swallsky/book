const buf = Buffer.from("hello",'ascii');

// 输出十六进制
console.log(buf.toString('hex'));

// 输出 base64
console.log(buf.toString('base64'));