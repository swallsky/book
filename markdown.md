## Markdown介绍

### 说明

- Markdown是一种轻量级标记语言，它充许人们使用易读易写的纯文本格式编写文档
- Markdown语言在2004年约翰·格鲁伯(英语:John Gruber)创建。
- Markdown编写的文档可以导出HTML、Word、图像、PDF、Epub等多种格式的文档。
- Markdown编写的文档后缀为 .md，.markdown。

### 优点

- 专注你的文字内容而不是排版样式，安心写作
- 轻松导出HTML，PDF和本身的.md文件
- 纯文本内容，兼容所有的文本编辑器与字处理软件
- 随时修改你的文章版本，不必像字处理软件生成若干文件版本导致混乱
- 可读、直观、学习成本低

### 工具

> 工欲善其事,必先利其器

* 曾经非常好用的typora，已经开始收费了

* 推荐使用MarkText，一个非常不错的替代器，重要事情说三遍，免费、免费、免费。

> MarkText介绍

* [MarkText官网](https://www.marktext.cc/)

* [MarkText 开源地址](https://github.com/marktext/marktext)

## Markdown基础用法

### 标题

> 使用#号标题
> 
> 使用#号可表示1-6级标题，一级标题对应一个#号，二级标题对应两个#号，以此类推
> 
> > # 一级标题 h1
> > 
> > ## 二级标题 h2
> > 
> > ### 三级标题 h3
> > 
> > #### 四级标题 h3
> > 
> > ##### 五级标题 h5
> > 
> > ###### 六级标题 h6

### 区块段落

> 1. 区块
>    MarkDown区块引用是在段落开头使用>符号，然后后面紧跟一个空格符号：
>    
>    `> 这里区块的引用. `
>    
>    > 这里是区块引用，学好MarkDown, 文档、写作都不怕

> 2. 区块嵌套
>    
>    ```
>    > 第一层
>    > > 第二层
>    > > > 第三层
>    ```
>    
>    > 第一层
>    > 
>    > > 第二层
>    > > 
>    > > > 第三层

> 3. 区块中使用列表
>    
>    > 列表
>    
>    ```
>    > 列表
>    > 1. 第一项
>    > 2. 第二项
>    > + 第一项
>    > + 第二项
>    > + 第三项
>    ```
>    
>    > 列表
>    > 
>    > 1. 第一项
>    > 
>    > 2. 第二项
>    >    
>    >    > + 第一项
>    >    > + 第二项
> 
> 4. 列表中使用区块
>    
>    ```
>    * 第一项
>      > 引用1
>      > 引用2
>    * 第二项
>      > 引用1
>      > 引用2
>    ```
>    
>    * 第一项
>      
>      > 引用1
>      > 引用2
>    
>    * 第二项
>      
>      > 引用1
>      > 引用2

### 插入连接或图片

> Markdown针对连接和图片的处理也比较简单，可以使用下面的语法标记

```
[点击跳转QQ](https://www.qq.com)
![晚霞](https://upload-images.jianshu.io/upload_images/703764-605e3cc2ecb664f6.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```

[点击跳转QQ](https://www.qq.com)
![晚霞](https://upload-images.jianshu.io/upload_images/703764-605e3cc2ecb664f6.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 列表

> + 无序列表：使用*或-来标识
> + 有序列表：使用数字加.标识

```
* 蔬菜1
* 熟菜2
* 熟菜3

+ 蔬菜1
+ 熟菜2
+ 熟菜3

- 蔬菜1
- 熟菜2
- 熟菜3

1. 蔬菜1
2. 熟菜2
3. 熟菜3
```

* 蔬菜1

* 熟菜2

* 熟菜3
+ 蔬菜1

+ 熟菜2

+ 熟菜3
- 蔬菜1

- 熟菜2

- 熟菜3
1. 蔬菜1
2. 熟菜2
3. 熟菜3

### 分隔线

> 三个以上的星号、减号、下划线，他们之间可以使用空格，但是行内不能有其他的文本

```
***
---
```

---

---

### 文本样式

**1. 斜体、粗体**

> 有时候，我们希望对某一部分文字进行强调，使用*或_包住，不能空格，否则无效，语法如下。

```
*斜体显示*
_斜体显示_

**加粗显示**
__加粗显示__

***粗斜体***
___粗斜体___
```

*斜体显示*
_斜体显示_

**加粗显示**
__加粗显示__

***粗斜体***
___粗斜体___

**2.删除线**

> 在需要加删除线的文字两端加上两个~即可，效果如下：

价格： ~¥500.0~

**3.下划线**

> 语法如下

```
<u>这是下划线</u>
```

<u>这是下划线</u>

**4.字体大小**

> 文本尺寸大小取值范围1~7,浏览器默认值是3，当大于7时，也只显示7的大小，语法如下：

```
<font size=1>字体size=1</font>
<font size=2>字体size=2</font>
<font size=3>字体size=3</font>
<font size=4>字体size=4</font>
<font size=7>字体size=7</font>
```

<font size=1>字体size=1</font>
<font size=2>字体size=2</font>
<font size=3>字体size=3</font>
<font size=4>字体size=4</font>
<font size=7>字体size=7</font>
<font size=70>字体size=70</font>

**5.高亮显示**

> 将字符包裹在==中即可,语法如下

```markdown
==高亮字==
```

==高亮字==

**6.居中显示**

> 将需要的字符用center包围，语法如下：

```
<center>居中的字</center>
```

<center>居中的字</center>

## Markdown的高级用法

### 表格

> 使用|来分隔不同的单元格，使用-来分隔表头和其他行。
> 
> + -: 设置内容和标题右对齐
> + :- 设置内容和标题左对齐
> + :-: 设置内容和标题居中对齐

```
| 表头1 | 表头2 |
| ---  | --- |
| 单元格数据1 | 单元格数据2 |
| 单元格数据1 | 单元格数据2 |

| 左对⻬ | 右对⻬ | 居中对⻬ | 
| :-----| ----: | :---: | 
| 单元格 | 单元格 | 单元格 | 
| 单元格 | 单元格 | 单元格 |
```

| 表头1    | 表头2    |
| ------ | ------ |
| 单元格数据1 | 单元格数据2 |
| 单元格数据1 | 单元格数据2 |

| 左对⻬         | 右对⻬         | 居中对⻬        |
|:----------- | -----------:|:-----------:|
| 单元格12333456 | 单元格12345678 | 单元格99999999 |
| 单元格         | 单元格         | 单元格         |

### 代码块

> 用三个反引号，将代码包裹起来，在第一个三个反引号后加上语言名称：

```javascript
let var1 = "hello world";
console.log(var1)
```

### 流程图

1. 横向流程图

```mermaid
graph LR
A[开始] -->B(审批)
 B --> C{年龄?}
 C -->|年龄>=18| D[通过]
 C -->|年龄<18| E[拒绝]
```

2. 竖向流程图

```mermaid
graph TD
A[开始] -->B(审批)
    B --> C{年龄?}
    C -->|年龄>=18| D[通过]
    C -->|年龄<18| E[拒绝]
```

3. 标准横向流程图

```flow
st=>start: 开始
op=>operation: 审批
cond=>condition: 年龄是否大于18
sub1=>subroutine: 返回审批
io=>inputoutput: 通过
e=>end: 结束
st(right)->op(right)->cond
cond(yes)->io(bottom)->e
cond(no)->sub1(right)->op
```

4. 标准竖向流程图

```flow
st=>start: 开始框
op=>operation: 处理框
cond=>condition: 判断框(是或否?)
sub1=>subroutine: 子流程
io=>inputoutput: 输入输出框
e=>end: 通过
st->op->cond
cond(yes)->io->e
cond(no)->sub1(right)->op
```

5. 时序图

```sequence
对象A->对象B: 对象B你好吗?（请求）
Note right of 对象B: 对象B的描述
Note left of 对象A: 对象A的描述(提示)
对象B-->对象A: 我很好(响应)
对象A->对象B: 你真的好吗？
```

6. 复杂时序图

```sequence
Title: 标题：复杂使用
对象A->对象B: 对象B你好吗?（请求）
Note right of 对象B: 对象B的描述
Note left of 对象A: 对象A的描述(提示)
对象B-->对象A: 我很好(响应)
对象B->小三: 你好吗
小三-->>对象A: 对象B找我了
对象A->对象B: 你真的好吗？
Note over 小三,对象B: 我们是朋友
participant C
Note right of C: 没人陪我玩
```

7. UML标准时序图

```mermaid
%% 时序图例子,-> 直线，-->虚线，->>实线箭头
  sequenceDiagram
    participant 张三
    participant 李四
    张三->王五: 王五你好吗？
    loop 健康检查
        王五->王五: 与疾病战斗
    end
    Note right of 王五: 合理 食物 <br/>看医生...
    李四-->>张三: 很好!
    王五->李四: 你怎么样?
    李四-->王五: 很好!
```

8. 甘特图

```mermaid
%% 语法示例
        gantt
        dateFormat  YYYY-MM-DD
        title 软件开发甘特图
        section 设计
        需求                      :done,    des1, 2022-01-06,2014-01-08
        原型                      :active,  des2, 2022-01-09, 3d
        UI设计                     :         des3, after des2, 5d
    未来任务                     :         des4, after des3, 5d
        section 开发
        学习准备理解需求                      :crit, done, 2022-01-06,24h
        设计框架                             :crit, done, after des2, 2d
        开发                                 :crit, active, 3d
        未来任务                              :crit, 5d
        耍                                   :2d
        section 测试
        功能测试                              :active, a1, after des3, 3d
        压力测试                               :after a1  , 20h
        测试报告                               : 48h
```

9. 类图

```mermaid
classDiagram
        class Account
        Account : +String owner
    Account <|-- BankAccount
        class BankAccount
    BankAccount : +String owner
    BankAccount : +Bigdecimal balance
    BankAccount : +deposit(amount)
    BankAccount : +withdrawl(amount)
```

10. 状态图

```mermaid
stateDiagram-v2
    [*] --> First
    state First {
        [*] --> second
        second --> [*]
    }
```

11. 饼图

```mermaid
pie
"苹果" : 386
"香蕉" : 85
"菠萝" : 15
```

12. 用户体验旅程图

```mermaid
journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 3: Me
```