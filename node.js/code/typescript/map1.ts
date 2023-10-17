let nameSiteMapping = new Map();

// 设置 Map 对象
nameSiteMapping.set("Google",1);
nameSiteMapping.set("MicroSoft",2);
nameSiteMapping.set("Apple",3);

console.log(nameSiteMapping);
console.log(nameSiteMapping.get("Google"));

// 循环迭代显示Map中的key
for(let key of nameSiteMapping.keys()){
    console.log(key);
}

// 迭代Map中的key=>value
for (let entry of nameSiteMapping.entries()){
    console.log(entry[0],entry[1]);
}

// 使用对象解析
for (let [key,value] of nameSiteMapping){
    console.log(key,value);
}