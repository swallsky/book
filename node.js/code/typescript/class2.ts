class Car {
    // 字段
    engine:string;

    // 构造函数
    constructor(engine:string){
        this.engine = engine;
    }

    // 方法
    disp():void {
        console.log("函数中显示发动机型号："+this.engine);
    }
}

// 创建实例对象
var obj = new Car("XXXX");

// 访问字段
console.log(obj.engine);

// 访问方法
obj.disp();

