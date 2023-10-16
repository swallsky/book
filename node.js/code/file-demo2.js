const fs = require("fs");

/**
 * 带x参数，可在没有文件时，自动创建,因此尽量少用x参数
 */
fs.open("test.txt",'ax',function(err,fd){
    if(err){
        console.error(err);
    }
});

// 判断是否是文件
fs.stat("./test.txt",function(err,stats){
    console.log(stats.isFile());
});