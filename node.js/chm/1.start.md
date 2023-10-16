## Node.js 入门

### 1. 优势

1. **异步和事件驱动：**
   
   Node.js 的核心特点是异步和事件驱动。这意味着 Node.js 能够处理大量并发连接，且每个连接都以非阻塞的方式运行。这使得 Node.js 能够处理高并发的、实时应用程序，如 WebSockets 和 IoT 应用程序。

2. **单线程：**
   
   Node.js 采用单线程模型，虽然 JavaScrip t 在服务器上只运行在单线程中，但由于 Node.js 的事件循环和非阻塞 I/O 操作，使得并发操作变得可能，尤其是对 I/O 密集型应用。

3. **跨平台：**
   
   Node.js 可以运行在 Windows、MacOS、Linux 等多种操作系统上，因为它的底层运行时环境基于 Chrome 的 V8 JavaScript 引擎。

4. **强大的生态系统：**
   
   借助于 npm（Node Package Manager），Node.js 拥有世界上最大的开源库生态系统，使得开发者可以方便地分享和使用其他人的代码，以及管理自己的项目中的各种包。

5. **快速开发和高性能**：
   
   Node.js 的简洁性和灵活性使得开发快速，且其高性能特性使得应用程序可以在较低的硬件资源下运行。

6. **与前端完美集成**：
   
   由于 Node.js 和浏览器中的 JavaScript 运行在不同的环境中，但它们都基于 V8 引擎，因此 Node.js 可以生成和前端 JavaScript 代码集成良好的 API。

### 2. 应用场景

1. **服务器端应用程序开发：**
   
   Node.js提供了一种高效的方式来开发服务器端应用程序。它可以处理大量并发请求，适用于构建实时通信应用、聊天应用、博客平台、电子商务网站等。

2. **前端构建工具：**
   
   Node.js可以用作前端构建工具，例如使用Webpack或Gulp等构建工具来编译、压缩和打包前端资源文件。通过使用Node.js，开发者可以轻松地管理和优化前端项目。

3. **命令行工具：**
   
   Node.js提供了一种简单的方式来创建命令行工具。开发者可以使用Node.js编写脚本来执行各种任务，如文件操作、数据转换等。许多流行的命令行工具，如npm(Node.js软件包管理器)和Git，都是使用Node.js编写的。

4. **实时应用程序**：
   
   由于Node.js具有事件驱动和非阻塞I/O的特性，它非常适合构建实时应用程序，如聊天应用、在线游戏、实时协作工具等。Node.js的高性能和可扩展性使得它成为实时应用程序开发的理想选择。

此外，Node.js还可以用于本地化的在线音乐应用、本地化的在线搜索应用、本地化的在线APP等场景。总的来说，Node.js的应用范围非常广泛，几乎涵盖了现代Web应用的各个方面。

### 3. 安装

> node.js的安装非常简单，从官网下载长期支持的版本(LTS版本)安装即可，具体操作如下

* 进入官网(https://nodejs.org/)

* 通过菜单栏点击DOWNLOADS菜单

* 选择LTS

* 选择对应系统的安装文件下载

* 下载完成后，双击运行，点击next一步一步安装即可

* 进行终端，在命令行窗口输入: node -v  显示了版本信息，即安装成功

### 4. 创建第一个应用

> + 使用require指令来加载和引入模块
> 
> + 创建一个简单的服务器

代码如下：

文件名：sever.js

```js
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(function(request,response){
    //发送HTTP头部
    // HTTP状态值 200
    // 返回文本
    response.writeHead(200,{'Content-Type':'text/plain'});
    //发送响应数据
    response.end("Hello World\n");
});

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
});
```

使用node命令执行以上代码

```shell
node sever.js
```

接下来，打开浏览器访问[http://127.0.0.1:3000/](http://127.0.0.1:8888/)

### 5. NPM包管理工具

> npm官网(https://www.npmjs.com/),  npm是随node.js一起安装的包管理工具，能解决NodeJS代码部署上的很多问题，使用场景有以下几种：
> 
> + 从NPM服务器下载别人编写的第三方包到本地使用。
> 
> + 从NPM服务器下载并安装别人编写的命令行程序到本地使用。
> 
> + 将自己编写的包或命令行程序上传到NPM服务器供别人使用。

#### 1. 常用命令

1. 查看是否安装成功，查看现有npm版本

```js
npm -v
```

2. 查看镜像源

```js
npm get registry
```

3. 如果下载第三方包比较慢，可以使用淘宝镜像，命令如下

```js
npm config set registry https://registry.npm.taobao.org
```

4. 安装第三包，例如安装express
* 本地安装

```js
npm install express
```

* 本地开发环境安装

```js
npm install express --save-dev
```

* 全局安装

```js
npm install express -g
```

5. 卸载npm安装的第三包

```js
npm uninstall express
```

卸载完成后，可以通过npm ls查看包是否还存在

```js
npm ls
```

6. 更新模块

```js
npm update express
```

7. 搜索模块

```js
npm search express
```

8. 创建模块(初始化package.json)

> 创建模块，package.json文件是必不可少的。package.json是npm包管理的配置文件，初始化命令如下：

```js
npm init
```

#### 2. package.json属性说明

* name     包名

* version  包的版本号

* description   包的描述

* scripts    脚本入口，key-value键值对配置，key为可运行的命令，可通过npm run来执行。

* homepage    包的官网url

* author         包的作者姓名

* contributors       包的其他贡献者姓名

* dependencies      依赖包列表(生产环境)。npm安装包在node_module目录下

* devDependencies   依耐包列表(开发环境)，也存在放在node_module目录下

* repository       包代码存放的地方的类型，可以是git或者svn,   git可在github上。

* main     main字段指定了程序的主放口文件，默认为模块根目录下的index.js。

* keywords    关键字

### 6. yarn包管理工具

> yarn是facebook、Google、Exponent和Tilde联合推出了一个新的JS包管理工具，为了弥补npm的一些缺陷而出现，例如npm install安装缓慢，npm安装中抛出错误被丢失等。 

#### 1. 特点

* 速度快
  
  yarn缓存每个下载过的包，所以再次使用时无需重复下载。同时利用并行下载以最大化资源利用率，因此安装速度更快。

* 更简治的输出
  
  npm输出信息比较冗长。yarn简洁太多，默认情况，结合了emoji直观打印必要信息，也提供一些命令供开发者查询额外的安装信息。

* 更好的语义化
  
  yarn改变了一些npm命令的名称，例如yarn add/remove,比npm原本的install/uninstall更清晰

#### 2. 安装

通过npm安装

```js
npm install -g yarn
```

#### 3. 常用命令

初始化项目

```js
yarn init
```

添加依耐包

```js
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```

升级依耐包

```js
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```

移除依耐包

```js
yarn remove [package]
```

全部安装

```js
yarn
```

运行scripts命令

```js
yarn [scripts-key]
```
