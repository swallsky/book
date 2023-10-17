class StaticMem {
    static num:number;
    static disp():void {
        console.log("num值为 "+StaticMem.num);
    }
}

StaticMem.num = 12;  // 初始化静态变量
StaticMem.disp();    // 调用静态方法