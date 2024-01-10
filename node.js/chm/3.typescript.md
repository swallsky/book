## TypeScript基础教程

### 介绍

> TypeScript是由微软开发的自由和开源的编程语言。
> 
> TypeScript是JavaScript的一个超集，支持ECMAScript 6标准。
> 
> TypeScript设计目标是开发大型应用，它可以编译成纯JavaScript，编译出来的JavaScript可以运行在任何浏览器上。

TypeScript是一种给JavaScript添加特性的语言扩展。增加的功能包括：

- 类型批注和编译时类型检查
- 类型推断
- 类型擦除
- 接口
- 枚举
- Mixin
- 泛型编程
- 名字空间
- 元组
- Await

### 安装

使用npm工具安装

```shell
npm install -g typescript
```

查看是否安装成功，tsc为TypeScript的编译器，可将编译结果生成js文件。

```shell
tsc -v
```

显示出版本信息，即安装成功。

升级typescript

```js
npm update -g typescript
```

要编译TypeScript文件，可使用如下命令：

```shell
tsc filename.ts
```

编译成功后，就会在相同目录下生成一个同名js文件，你可以通过命令参数来修改默认的的输出名称。

新建一个test.ts的文件，代码如下：

```ts
let message:string = "Hello World"
console.log(message)
```

执行编译命令

```shell
tsc test.ts
```

会在当前目录下生成同名的test.js文件，执行js文件

```shell
node test.js
```

生成`tsconfig.json`配置文件

```shell
tsc --init
```

监听ts的文件变化，并生成对应的js文件

```shell
tsc -w
```



### 基础用法

> TypeScript程序由以下几个部分组成：
> 
> * 模块
> 
> * 函数
> 
> * 变量
> 
> * 语句和表达式
> 
> * 注释

**变量申明：**

```js
var [变量名] : [类型] = 值;
```

**例如：**

```ts
var name:string = "Jack";
var score:number = 100;
var subject:string[] = ["语文","数学","英语"];
```

**TypeScript基础类型**

| 数据类型      | 关键字       | 描述                                                                                        |
| --------- | --------- | ----------------------------------------------------------------------------------------- |
| 任意类型      | any       | 声明为 any 的变量可以赋予任意类型的值。                                                                    |
| 数字类型      | number    | 双精度 64 位浮点值。它可以用来表示整数和分数。                                                                 |
| 字符串类型     | string    | 一个字符系列，使用单引号（'）或双引号（"）来表示字符串类型。反引号（`）来定义多行文本和内嵌表达式。                                       |
| 布尔类型      | boolean   | 表示逻辑值：true 和 false。                                                                       |
| 数组类型      | 无         | 声明变量为数组。` let arr: number[] = [1, 2];`                                                    |
| 元组        | 无         | 元组类型用来表示已知元素数量和类型的数组，各元素的类型不必相同，对应位置的类型需要相同。                                              |
| 枚举        | enum      | 枚举类型用于定义数值集合。`enum Color {Red, Green, Blue}; let c: Color = Color.Blue; console.log(c); ` |
| void      | void      | 用于标识方法返回值的类型，表示该方法没有返回值。                                                                  |
| null      | null      | 表示对象值缺失。                                                                                  |
| undefined | undefined | 用于初始化变量为一个未定义的值                                                                           |
| never     | never     | never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。                                           |

**注意** TypeScript和JavaScript都没有整数类型。

tsc常用编译参数如下：

| 参数                     | 说明                                                           |
| ---------------------- | ------------------------------------------------------------ |
| --help                 | 显示帮助信息                                                       |
| --init                 | 生成tsconfig.json配置文件                                          |
| --module               | 载入扩展模块                                                       |
| --target               | 设置 ECMA 版本                                                   |
| --declaration          | 额外生成一个 .d.ts 扩展名的文件。                                         |
| --removeComments       | 删除文件的注释                                                      |
| --out                  | 编译多个文件并合并到一个输出的文件                                            |
| --sourcemap            | 生成一个 sourcemap (.map) 文件。sourcemap 是一个存储源代码与编译代码对应位置映射的信息文件。 |
| --module noImplicitAny | 在表达式和声明上有隐含的 any 类型时报错                                       |
| --watch                | 在监视模式下运行编译器。会监视输出文件，在它们改变时重新编译。                              |

**特别说明** TypeScript区分大写和小写字符。

每行指令都是一段语句，可以使用分号或不使用，分号在TypeScript中是可选的，建议使用。

TypeScript支持两种类型的注释

- **单行注释 ( // )** − 在 // 后面的文字都是注释内容。

- **多行注释 (/* */)** − 这种注释可以跨越多行。

TypeScript支持现向对象的编程

实例class1.ts

```ts
class Site {
    name():void {
        console.log("Hello jack!");
    }
}
const Obj = new Site();
Obj.name();
```

编译后tsc class1.ts的class1.js文件如下：

```js
var Site = /** @class */ (function () {
    function Site() {
    }
    Site.prototype.name = function () {
        console.log("Hello Jack");
    };
    return Site;
}());
var Obj = new Site();
Obj.name();
```

执行js文件 node class1.js

### Number

> Number对象是原始数值的包装对象。
> 
> 语法：
> 
> ```js
> var num = new Number(value);
> ```
> 
> 注意：如果一个参数值不能转换为一个数字将返回NaN(非数字值)

实例：

```ts
console.log("TypeScript Number 属性: "); 
console.log("最大值为: " + Number.MAX_VALUE); 
console.log("最小值为: " + Number.MIN_VALUE); 
console.log("负无穷大: " + Number.NEGATIVE_INFINITY); 
console.log("正无穷大:" + Number.POSITIVE_INFINITY);
```

**Number对象方法**

| 方法               | 描述                                                     |
| ---------------- | ------------------------------------------------------ |
| toExponential()  | 把对象的值转换为指数计数法。                                         |
| toFixed()        | 把数字转换为字符串，并对小数点指定位数。                                   |
| toLocaleString() | 把数字转换为字符串，使用本地数字格式顺序。                                  |
| toPrecision()    | 把数字格式化为指定的长度。                                          |
| toString()       | 把数字转换为字符串，使用指定的基数。数字的基数是 2 ~ 36 之间的整数。若省略该参数，则使用基数 10。 |
| valueOf()        | 返回一个 Number 对象的原始数字值。                                  |

### String

> String对象用于处理文本(字符串)。
> 
> 语法
> 
> ```js
> var txt = new String("string");
> // 或者更简单方式：
> // var txt = "string";
> ```

**String对象属性**

| 属性          | 描述             |
| ----------- | -------------- |
| constructor | 对创建该对象的函数的引用。  |
| length      | 返回字符串的长度。      |
| prototype   | 允许您向对象添加属性和方法。 |

**String方法**

| 方法                  | 属性                                            |
| ------------------- | --------------------------------------------- |
| charAt()            | 返回在指定位置的字符。                                   |
| charCodeAt()        | 返回在指定的位置的字符的 Unicode 编码。                      |
| concat()            | 连接两个或更多字符串，并返回新的字符串。                          |
| indexOf()           | 返回某个指定的字符串值在字符串中首次出现的位置。                      |
| lastIndexOf()       | 从后向前搜索字符串，并从起始位置（0）开始计算返回字符串最后出现的位置。          |
| localeCompare()     | 用本地特定的顺序来比较两个字符串。                             |
| match()             | 查找找到一个或多个正则表达式的匹配。                            |
| replace()           | 替换与正则表达式匹配的子串                                 |
| search()            | 检索与正则表达式相匹配的值                                 |
| slice()             | 提取字符串的片断，并在新的字符串中返回被提取的部分。                    |
| split()             | 把字符串分割为子字符串数组。                                |
| substr()            | 从起始索引号提取字符串中指定数目的字符。                          |
| substring()         | 提取字符串中两个指定的索引号之间的字符。                          |
| toLocaleLowerCase() | 根据主机的语言环境把字符串转换为小写，只有几种语言（如土耳其语）具有地方特有的大小写映射。 |
| toLocaleUpperCase() | 据主机的语言环境把字符串转换为大写，只有几种语言（如土耳其语）具有地方特有的大小写映射。  |
| toLowerCase()       | 把字符串转换为小写。                                    |
| toString()          | 返回字符串。                                        |
| toUpperCase()       | 把字符串转换为大写。                                    |
| valueOf()           | 返回指定字符串对象的原始值。                                |

### Array

> 数组对象是使用单独的变量名来存储一系列的值。
> 
> 语法如下：
> 
> ```js
> var array_name[:datatype];        //声明 
> array_name = [val1,val2,valn..]   //初始化
> // 或直接声明
> var array_name[:datatype] = [val1,val2…valn]
> ```

实例代码如下：

```js
var numlist:number[] = [2,4,6,8];
```

**数组方法**

| 方法            | 描述                                       |
| ------------- | ---------------------------------------- |
| concat()      | 连接两个或更多的数组，并返回结果。                        |
| every()       | 检测数值元素的每个元素是否都符合条件。                      |
| filter()      | 检测数值元素，并返回符合条件所有元素的数组。                   |
| forEach()     | 数组每个元素都执行一次回调函数。                         |
| indexOf()     | 搜索数组中的元素，并返回它所在的位置。如果搜索不到，返回值 -1，代表没有此项。 |
| join()        | 把数组的所有元素放入一个字符串。                         |
| lastIndexOf() | 返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。   |
| map()         | 通过指定函数处理数组的每个元素，并返回处理后的数组。               |
| pop()         | 删除数组的最后一个元素并返回删除的元素。                     |
| push()        | 向数组的末尾添加一个或更多元素，并返回新的长度。                 |
| reduce()      | 将数组元素计算为一个值（从左到右）。                       |
| reduceRight() | 将数组元素计算为一个值（从右到左）。                       |
| reverse()     | 反转数组的元素顺序。                               |
| shift()       | 删除并返回数组的第一个元素。                           |
| slice()       | 选取数组的的一部分，并返回一个新数组。                      |
| some()        | 检测数组元素中是否有元素符合指定条件。                      |
| sort()        | 对数组的元素进行排序。                              |
| splice()      | 从数组中添加或删除元素。                             |
| toString()    | 把数组转换为字符串，并返回结果。                         |
| unshift()     | 向数组的开头添加一个或更多元素，并返回新的长度。                 |

### Map对象

> Map对象保存键值对，并且能够记住键的原始插入顺序。

#### 1.  创建Map

> TypeScript使用Map类型和new关键字来创建Map：
> 
> ```js
> let myMap = new Map();
> ```

Map相关的函数和属性：

- map.clear() – 移除 Map 对象的所有键/值对 。
- map.set() – 设置键值对，返回该 Map 对象。
- map.get() – 返回键对应的值，如果不存在，则返回 undefined。
- map.has() – 返回一个布尔值，用于判断 Map 中是否包含键对应的值。
- map.delete() – 删除 Map 中的元素，删除成功返回 true，失败返回 false。
- map.size – 返回 Map 对象键/值对的数量。
- map.keys() - 返回一个 Iterator 对象， 包含了 Map 对象中每个元素的键 。
- map.values() – 返回一个新的Iterator对象，包含了Map对象中每个元素的值 。

**实例代码(map1.ts)如下：**

```js
let nameSiteMapping = new Map();
// 设置 Map 对象
nameSiteMapping.set("Google",1);
nameSiteMapping.set("MicroSoft",2);
nameSiteMapping.set("Apple",3);

console.log(nameSiteMapping);
console.log(nameSiteMapping.get("Google"));
```

执行编译

```shell
tsc --target es6 map1.ts
```

运行结果

```shell
node map1.js
```

#### 2. 迭代Map

> Map对象中的元素是按顺序插入的，我们可以迭代Map对象，每一次迭代返回[key,value]数组。

实例代码(map1.ts)如下：

```js
let nameSiteMapping = new Map();

// 设置 Map 对象
nameSiteMapping.set("Google",1);
nameSiteMapping.set("MicroSoft",2);
nameSiteMapping.set("Apple",3);

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
```

执行编译

```shell
tsc --target es6 map1.ts
```

运行结果

```shell
node map1.js
```

### 联合类型

> 联合类型(Union Types)可以通过管道(|)将变量设置多种类型，赋值时可以根据设置的类型来赋值。
> 
> 语法格式如下：
> 
> ```js
> Type1|Type2|Type3
> ```

实例

```ts
var val:string|number;
val = 12;
console.log("数字为 "+ val);
val = "Hello";
console.log("字符串为 "+val);
```

**联合类型数组**

可以将数组声明为联合类型：

实例代码：

```ts
var arr:number[] | string[];
var i:number;
arr = [1,2,3];


for(i=0;i<arr.length;i++){
    console.log(arr[i);
}

arr = ["Hello","Google","Taobao"];
for(i=0;i<arr.length;i++){
    console.log(arr[i]);
}
```

### 接口

> 接口是一系列抽象方法的声明，是一些方法特征的集合，这些方法都应该是抽象的，需要由具体的类去实现，然后第三方就可以通过这组抽象方法调用，让具体的类执行具体的方法。

TypeScript接口定义如下：

```ts
// 定义
interface interface_name {
    var1: string,
    [index:number]:string
}

//继承
interface Musician extends interface_name {
    instrument:string
}
```

实例代码：

```ts
// 定义接口
interface IPerson {
    firstName: string,
    lastName: string,
    sayHi:()=>string
};

//接口实例
var customer:IPerson = {
    firstName: "Tom",
    lastName: "Hanks",
    sayHi:():string=>{return "Hi there"}
};

console.log(customer);

// 数组
interface namelist {
    [index:number]:string
};

var list2:namelist = ["Google","Apple","Microsoft"];
console.log(list2);

//继承
interface Person {
    age:number
}

interface Musician extends Person {
    instrument:string
}


var drummer = <Musician>{};
drummer.age = 27;
drummer.instrument = "Dream";
console.log(drummer.age);
console.log(drummer.instrument);
```

**多继承实例**

```ts
interface IParent1 {
    v1:number
};

interface IParent2 {
    v2:number
};

interface Child extends IParent1,Iparent2 {};
var Iobj:Child = { v1:12,v2:23 };
console.log("value 1:"+Iobj.v1+"value 2:"+Iobj.v2);
```

### 类

> TypeScript是面向对象的JavaScript。
> 
> 类描述了所创建的对象共同的属性和方法。
> 
> TypeScript类定义方式如下：
> 
> ```ts
> class class_name {
>     //类作用域
> }
> ```
> 
> 类可以包含以下几个模块
> 
> - **字段** − 字段是类里面声明的变量。字段表示对象的有关数据。
> 
> - **构造函数** − 类实例化时调用，可以为类的对象分配内存。
> 
> - **方法** − 方法为对象要执行的操作。

实例

```ts
class Car {
    // 字段
    engine: string;

    // 构造函数
    constructor(engine:string){
        this.engine = engine;
    }

    // 方法
    disp():void {
        console.log("发动机："+this.engine);
    }
}
```

**创建实例化对象**

使用new关键字来实例化类的对象，语法格式如下：

```ts
var object_name = new class_name([ arguments ]);
```

类实例化时会调用构造函数

类中的字段属性的方法可以使用.来访问：

```ts
// 访问性性
obj.field_name;

// 访问方法
obj.function_name();
```

**完整实例**

```ts
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
```

**类的继承**

> TypeScript支持继承类，即我们可以在创建类的时候继承一个已存在的类，这个已存在的类称为父类，继承它的类称为子类。
> 
> 类继承使用关键字extends，子类除了不能继承父类的私有成员(方法和属性)和构造函数，其他的都可以继承。
> 
> TypeScript一次只能继承一个类，不支持继承多个类，但TypeScript支持多重继承(A继承B，B继承C)。

语法格式如下：

```ts
class child_class_name extends parent_class_name
```

实例代码如下：

```ts
class Shape {
    Area:number;
    constructor(a:number){
        this.Area = a;
    }
}

class Circle extends Shape {
    disp():void {
        console.log("圆的面积："+this.Area);
    }
}

var obj = new Circle(223);
obj.disp();
```

**继承类的方法重写**

> 类继承后，子类可以对父类的方法重新定义，这个过程称为方法的重写。
> 
> 其中super关键字是对父类的直接引用，该关键字可以引用父类的属性和方法。

```ts
class Printer {
    doPrint():void{
        console.log("父类的 doPrint()方法");
    }
}

class StringPrinter extends Printer {
    doPrint(): void {
        super.doPrint(); //调用父类的函数
        console.log("子类的doPrint()方法。");
    }
}

var printer = new StringPrinter();
printer.doPrint();
```

**static关键字**

> static关键字用于定义类的数据成员(属性和方法)为静态的，静态成员可以直接通过类名调用。

实例如代码class5.ts如下：

```ts
class StaticMem {
    static num:number;
    static disp():void {
        console.log("num值为 "+StaticMem.num);
    }
}

StaticMem.num = 12;  // 初始化静态变量
StaticMem.disp();    // 调用静态方法
```

**instanceof运算符**

> instanceof运算符用于判断对象是否是指定的类型，如果是返回true，否则返回false。

实例代码class6.ts如下：

```ts
class Person {}
var objs = new Person();
var isPerson = objs instanceof Person;
console.log("objs 对象是Person类实例化来的吗？"+isPerson);
```

**访问控制修饰符**

> TypeScript中，可以使用访问控制符来保护对类、变量、方法和构造方法的访问。
> 
> - **public（默认）** : 公有，可以在任何地方被访问。
> 
> - **protected** : 受保护，可以被其自身以及其子类访问。
> 
> - **private** : 私有，只能被其定义所在的类访问。

实例代码如下：

```ts
class Encapsulate { 
   str1:string = "hello" 
   private str2:string = "world" 
}

var obj = new Encapsulate() 
console.log(obj.str1)     // 可访问 
console.log(obj.str2)   // 编译错误， str2 是私有的
```

**类和接口**

> 类可以实现接口，使用关键字implements。

实例代码如下：

```ts
interface ILoan { 
   interest:number 
} 

class AgriLoan implements ILoan { 
   interest:number 
   rebate:number 

   constructor(interest:number,rebate:number) { 
      this.interest = interest 
      this.rebate = rebate 
   } 
} 

var obj = new AgriLoan(10,1) 
console.log("利润为 : "+obj.interest+"，抽成为 : "+obj.rebate )
```
