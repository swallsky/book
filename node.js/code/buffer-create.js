// 创建一个长度为10，且用0填充的Buffer
const buf1 = Buffer.alloc(10);
// Buffer类型 <Buffer 00 00 00 00 00 00 00 00 00 00>
console.log(buf1);

// 创建一个Buffer类，长度为10，且用01来填充
const buf2 = Buffer.alloc(10, 1);
// <Buffer 01 01 01 01 01 01 01 01 01 01>
console.log(buf2);

// 创建一个长度为10，且未初始化的Buffer.
// 这个方法比调用 Buffer.alloc()更快，
// 但返回的Buffer实例可能包含旧数据
// 因此需要使用fill()或write()重写。
const buf3 = Buffer.allocUnsafe(10);
console.log(buf3);

// 创建一个包含 <Buffer 01 02 03> 的Buffer
const buf4 = Buffer.from([1,2,3]);
console.log(buf4);

// 创建一个包含UTF-8字节 <Buffer 74 65 73 74> 的Buffer
const buf5 = Buffer.from("test");
console.log(buf5);

// 创建一个包含Latin-1字节 <Buffer 74 65 73 74> 的Buffer
const buf6 = Buffer.from("test","latin1");
console.log(buf6);