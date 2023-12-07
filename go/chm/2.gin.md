### Gin框架介绍

> Gin是一个Go编写的Web框架(类似Node.js的express、koa等框架)，性能很好，是一个轻量级的Web框架。本章将从安装使用，以及路由、中间件、日志等方面介绍Gin。

[Gin官方文档](https://gin-gonic.com/zh-cn/docs/introduction/)

### 安装和使用

> 要求：Go版本大于1.13

* 进入项目目录，初始化

```shell
go mod init demo1.com
```

* 下载并安装gin框架

```shell
go get -u github.com/gin-gonic/gin
```

* 在项目目录下开始使用使用main.go

```go
package main

import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()
    r.GET("/ping", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "message": "pong",
        })
    })
    r.Run() // 监听并在 0.0.0.0:8080 上启动服务
}
```

* 使用go run 运行程序

```shell
go run main.go
```

* 开发时，可借助air进行代码热更新，提高开发效率

[go air相关的文档](https://github.com/cosmtrek/air/blob/master/README-zh_cn.md)

### 示例

> 以实例的方式，展示gin相关的功能

#### HTML渲染

> 使用 LoadHTMLGlob() 或者 LoadHTMLFiles()

go代码如下：

```go
func main() {
    router := gin.Default()
    router.LoadHTMLGlob("templates/*")
    //router.LoadHTMLFiles("templates/template1.html", "templates/template2.html")
    router.GET("/index", func(c *gin.Context) {
        c.HTML(http.StatusOK, "index.tmpl", gin.H{
            "title": "Main website",
        })
    })
    router.Run(":8080")
}
```

templates/index.tmpl的模板代码

```html
<html>
    <h1>
        {{ .title }}
    </h1>
</html>
```

#### 表单处理

* 通过结构体和ShouldBind函数进行绑定

```go
package main

import (
    "github.com/gin-gonic/gin"
)

type LoginForm struct {
    User     string `form:"user" binding:"required"`
    Password string `form:"password" binding:"required"`
}

func main() {
    router := gin.Default()
    router.POST("/login", func(c *gin.Context) {
        // 使用显式绑定声明绑定 multipart form：
        // c.ShouldBindWith(&form, binding.Form)
        // 或者简单地使用 ShouldBind 方法自动绑定：
        var form LoginForm
        // 在这种情况下，将自动选择合适的绑定
        if c.ShouldBind(&form) == nil {
            if form.User == "user" && form.Password == "password" {
                c.JSON(200, gin.H{"status": "you are logged in"})
            } else {
                c.JSON(401, gin.H{"status": "unauthorized"})
            }
        }
    })
    router.Run(":8080")
}
```

* 使用DefaultPostForm、PostForm函数进行表单处理

```go
func main() {
    router := gin.Default()

    router.POST("/form_post", func(c *gin.Context) {
        message := c.PostForm("message")
        nick := c.DefaultPostForm("nick", "anonymous")

        c.JSON(200, gin.H{
            "status":  "posted",
            "message": message,
            "nick":    nick,
        })
    })
    router.Run(":8080")
}
```

gin通过Query获取url参数，通过PostForm来获取POST提交的数据

```go
func main() {
    router := gin.Default()

    router.POST("/post", func(c *gin.Context) {

        id := c.Query("id")
        page := c.DefaultQuery("page", "0")
        name := c.PostForm("name")
        message := c.PostForm("message")

        fmt.Printf("id: %s; page: %s; name: %s; message: %s", id, page, name, message)
    })
    router.Run(":8080")
}
```

#### 各种格式的渲染

gin支持XML/JSON/YAML/ProBuf渲染，详情实例见下：

```go
func main() {
    r := gin.Default()

    // gin.H 是 map[string]interface{} 的一种快捷方式
    r.GET("/someJSON", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"message": "hey", "status": http.StatusOK})
    })

    r.GET("/moreJSON", func(c *gin.Context) {
        // 你也可以使用一个结构体
        var msg struct {
            Name    string `json:"user"`
            Message string
            Number  int
        }
        msg.Name = "Lena"
        msg.Message = "hey"
        msg.Number = 123
        // 注意 msg.Name 在 JSON 中变成了 "user"
        // 将输出：{"user": "Lena", "Message": "hey", "Number": 123}
        c.JSON(http.StatusOK, msg)
    })

    r.GET("/someXML", func(c *gin.Context) {
        c.XML(http.StatusOK, gin.H{"message": "hey", "status": http.StatusOK})
    })

    r.GET("/someYAML", func(c *gin.Context) {
        c.YAML(http.StatusOK, gin.H{"message": "hey", "status": http.StatusOK})
    })

    r.GET("/someProtoBuf", func(c *gin.Context) {
        reps := []int64{int64(1), int64(2)}
        label := "test"
        // protobuf 的具体定义写在 testdata/protoexample 文件中。
        data := &protoexample.Test{
            Label: &label,
            Reps:  reps,
        }
        // 请注意，数据在响应中变为二进制数据
        // 将输出被 protoexample.Test protobuf 序列化了的数据
        c.ProtoBuf(http.StatusOK, data)
    })

    // 监听并在 0.0.0.0:8080 上启动服务
    r.Run(":8080")
}
```

#### 文件上传

html页面代码(tpls/onefile.html)如下:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>单文件上传</title>
</head>
<body>
    <form method="post" action="/onefile" enctype="multipart/form-data">
        <input type="file" name="file" />
        <button type="submit">提交</button>
    </form>
</body>
</html>
```

多文件上传页面(tpls/morefile.html)如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>多文件上传</title>
</head>
<body>
    <form method="post" action="/morefile" enctype="multipart/form-data">
        <input type="file" name="upload[]" />
        <input type="file" name="upload[]" />
        <input type="file" name="upload[]" />
        <button type="submit">提交</button>
    </form>
</body>
</html>
```

文件文件上传的go代码

```go
package mds

import (
    "fmt"
    "log"
    "net/http"

    "github.com/gin-gonic/gin"
)

// 单文件上传模板页面
func OneFileHtml(c *gin.Context) {
    c.HTML(http.StatusOK, "onefile.html", gin.H{})
}

// 上传文件
func OneFile(c *gin.Context) {
    // 单文件
    file, _ := c.FormFile("file")
    log.Println(file.Filename)

    dst := "./assets/imgs/" + file.Filename //上传文件完整路径,以程序运行的根目录为准
    // 上传文件至指定的完整文件路径
    c.SaveUploadedFile(file, dst)
    c.String(http.StatusOK, fmt.Sprintf("%s uploaded!", file.Filename))
}


// 多文件页面
func MoreFileHtml(c *gin.Context) {
    c.HTML(http.StatusOK, "morefile.html", gin.H{})
}

// 多文件页面处理
func MoreFile(c *gin.Context) {
    form, _ := c.MultipartForm()
    files := form.File["upload[]"]
    // 循环上传文件
    for _, file := range files {
        log.Println(file.Filename)
        //上传至文件指定的目录
        dst := "./assets/mores/" + file.Filename
        c.SaveUploadedFile(file, dst)
    }
    c.String(200, fmt.Sprintf("%d files uploaded!", len(files)))
}
```

在main.go中设置路由

```go
package main

import (
    "demo.com/mds"
    "demo.com/middles"
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    f := r.Group("/file")                //文件上传分组
    {
        f.GET("/onefile", mds.OneFileHtml)   //单文件上传页面
        f.POST("/onefile", mds.OneFile)      //单文件上传处理
        f.GET("/morefile", mds.MoreFileHtml) //多文件上传页面
        f.POST("/morefile", mds.MoreFile)    //多文件上传页面处理
    }
}
```

#### 路由组

> 上面的多文件上传，就用到了路由分组，gin的路由分很简单，使用Group函数进行路由分组。

实例代码如下：

```go
func main() {
    router := gin.Default()

    // 简单的路由组: v1
    v1 := router.Group("/v1")
    {
        v1.POST("/login", loginEndpoint)
        v1.POST("/submit", submitEndpoint)
        v1.POST("/read", readEndpoint)
    }

    // 简单的路由组: v2
    v2 := router.Group("/v2")
    {
        v2.POST("/login", loginEndpoint)
        v2.POST("/submit", submitEndpoint)
        v2.POST("/read", readEndpoint)
    }

    router.Run(":8080")
}
```

#### 路由path参数

> gin支持像/user/:name，这种路由path格式，通过Param参数可获取对应的路由path参数

详细代码如下：

```go
func main() {
    router := gin.Default()

    // 此 handler 将匹配 /user/john 但不会匹配 /user/ 或者 /user
    router.GET("/user/:name", func(c *gin.Context) {
        name := c.Param("name")
        c.String(http.StatusOK, "Hello %s", name)
    })

    // 此 handler 将匹配 /user/john/ 和 /user/john/send
    // 如果没有其他路由匹配 /user/john，它将重定向到 /user/john/
    router.GET("/user/:name/*action", func(c *gin.Context) {
        name := c.Param("name")
        action := c.Param("action")
        message := name + " is " + action
        c.String(http.StatusOK, message)
    })

    router.Run(":8080")
}
```

#### Cookie

> gin默认也集中了cookie相关的操作

Cookie代码操作如下：

```go
import (
    "fmt"
    "github.com/gin-gonic/gin"
)
func main() {
    router := gin.Default()
    router.GET("/cookie", func(c *gin.Context) {
        cookie, err := c.Cookie("gin_cookie") //获取对应的cookie值
        if err != nil {
            cookie = "NotSet"
            // 设置cookie值
            c.SetCookie("gin_cookie", "test", 3600, "/", "localhost", false, true)
        }

        fmt.Printf("Cookie value: %s \n", cookie)
    })

    router.Run()
}
```

#### 重定向

> HTTP重定向很容易。内部、外部重定向均支持，通过Redirect函数进行重定向

Get重定向

```go
r.GET("/test", func(c *gin.Context) {
    c.Redirect(http.StatusMovedPermanently, "http://www.google.com/")
})
```

POST重定向

```go
r.POST("/test", func(c *gin.Context) {
    c.Redirect(http.StatusFound, "/foo")
})
```

路由重定向，使用HandleContext

```go
r.GET("/test", func(c *gin.Context) {
    c.Request.URL.Path = "/test2"
    r.HandleContext(c)
})
r.GET("/test2", func(c *gin.Context) {
    c.JSON(200, gin.H{"hello": "world"})
})
```

#### 中间件

> gin的中间件，使用也相对较简单，请见代码实例

gin中间件的代码如下：

```go
func Logger() gin.HandlerFunc {
    return func(c *gin.Context) {
        t := time.Now()

        // 设置 example 变量
        c.Set("example", "12345")

        // 请求前

        c.Next()

        // 请求后
        latency := time.Since(t)
        log.Print(latency)
    }
}

func main() {
    r := gin.New() //关闭默认的中间件
    r.Use(Logger()) //使用自定义的中间件

    r.GET("/test", func(c *gin.Context) {
        example := c.MustGet("example").(string)

        // 打印："12345"
        log.Println(example)
    })

    // 监听并在 0.0.0.0:8080 上启动服务
    r.Run(":8080")
}
```

#### 自定义日志文件

> 上节我们学习了gin的中间件，gin的日志文件，也是使用的中间件的模式

自定义日志文件的详情代码如下：

```go
func main() {
    router := gin.New()
    // LoggerWithFormatter 中间件会写入日志到 gin.DefaultWriter
    // 默认 gin.DefaultWriter = os.Stdout
    router.Use(gin.LoggerWithFormatter(func(param gin.LogFormatterParams) string {
        // 你的自定义格式
        return fmt.Sprintf("%s - [%s] \"%s %s %s %d %s \"%s\" %s\"\n",
                param.ClientIP,
                param.TimeStamp.Format(time.RFC1123),
                param.Method,
                param.Path,
                param.Request.Proto,
                param.StatusCode,
                param.Latency,
                param.Request.UserAgent(),
                param.ErrorMessage,
        )
    }))
    router.Use(gin.Recovery())
    router.GET("/ping", func(c *gin.Context) {
        c.String(200, "pong")
    })
    router.Run(":8080")
}
```

#### JWT

> JWT全称JSON Web Token是一种跨域认证解决方案，属于一个开放的标准，它规定了一种Token实现方式，目前多用于前后端分离项目和OAuth2.0业务场景下。

我们使用第三方库jwt-go来实现生成JWT和解析JWT的功能。

**安装jwt-go：**

```shell
go get -u github.com/dgrijalva/jwt-go
```

**生成JWT和解析JWT：**

```go
// MyClaims 自定义声明结构体并内嵌jwt.StandardClaims
// jwt包自带的jwt.StandardClaims只包含了官方字段
// 我们这里需要额外记录一个username字段，所以要自定义结构体
// 如果想要保存更多信息，都可以添加到这个结构体中
type MyClaims struct {
    Username string `json:"username"`
    jwt.StandardClaims
}
// 设置JWT过期时间，这里设置为2小
const TokenExpireDuration = time.Hour * 2
// 设置一个私钥
var MySecret = []byte("123456")

// GenToken 生成JWT
func GenToken(username string) (string, error) {
    // 创建一个我们自己的声明
    c := MyClaims{
        username, // 自定义字段
        jwt.StandardClaims{
            ExpiresAt: time.Now().Add(TokenExpireDuration).Unix(), // 过期时间
            Issuer:    "my-project",                               // 签发人
        },
    }
    // 使用指定的签名方法创建签名对象
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, c)
    // 使用指定的secret签名并获得完整的编码后的字符串token
    return token.SignedString(MySecret)
}


// ParseToken 解析JWT
func ParseToken(tokenString string) (*MyClaims, error) {
    // 解析token
    token, err := jwt.ParseWithClaims(tokenString, &MyClaims{}, func(token *jwt.Token) (i interface{}, err error) {
        return MySecret, nil
    })
    if err != nil {
        return nil, err
    }
    if claims, ok := token.Claims.(*MyClaims); ok && token.Valid { // 校验token
        return claims, nil
    }
    return nil, errors.New("invalid token")
}
```

在gin框架中使用JWT

首先写一个登录接口，通过用户和密码判断成功后，生成token并返回，代码如下：

```go
r.POST("/auth", authHandler)

我们的authHandler定义如下：

func authHandler(c *gin.Context) {
    // 用户发送用户名和密码过来
    var user UserInfo
    err := c.ShouldBind(&user)
    if err != nil {
        c.JSON(http.StatusOK, gin.H{
            "code": 2001,
            "msg":  "无效的参数",
        })
        return
    }
    // 校验用户名和密码是否正确
    if user.Username == "q1mi" && user.Password == "q1mi123" {
        // 生成Token
        tokenString, _ := GenToken(user.Username)
        c.JSON(http.StatusOK, gin.H{
            "code": 2000,
            "msg":  "success",
            "data": gin.H{"token": tokenString},
        })
        return
    }
    c.JSON(http.StatusOK, gin.H{
        "code": 2002,
        "msg":  "鉴权失败",
    })
    return
}
```

需要使用到授权接口时，就需要验证JWT，在gin中就需要使用中间件，具体的代码如下：

```go
// JWTAuthMiddleware 基于JWT的认证中间件
func JWTAuthMiddleware() func(c *gin.Context) {
    return func(c *gin.Context) {
        // 客户端携带Token有三种方式 1.放在请求头 2.放在请求体 3.放在URI
        // 这里假设Token放在Header的Authorization中，并使用Bearer开头
        // 这里的具体实现方式要依据你的实际业务情况决定
        authHeader := c.PostForm("Authorization")
        if authHeader == "" {
            c.JSON(http.StatusOK, gin.H{
                "code": 2003,
                "msg":  "请求头中auth为空",
            })
            c.Abort()
            return
        }
        // 按空格分割
        parts := strings.SplitN(authHeader, " ", 2)
        if !(len(parts) == 2 && parts[0] == "Bearer") {
            c.JSON(http.StatusOK, gin.H{
                "code": 2004,
                "msg":  "请求头中auth格式有误",
            })
            c.Abort()
            return
        }
        // parts[1]是获取到的tokenString，我们使用之前定义好的解析JWT的函数来解析它
        mc, err := ParseToken(parts[1])
        if err != nil {
            c.JSON(http.StatusOK, gin.H{
                "code": 2005,
                "msg":  "无效的Token",
            })
            c.Abort()
            return
        }
        // 将当前请求的username信息保存到请求的上下文c上
        c.Set("username", mc.Username)
        c.Next() // 后续的处理函数可以用过c.Get("username")来获取当前请求的用户信息
    }
}

// 注册一个/home路由，发个请求验证一下吧。

r.GET("/home", JWTAuthMiddleware(), homeHandler)

func homeHandler(c *gin.Context) {
    username := c.MustGet("username").(string)
    c.JSON(http.StatusOK, gin.H{
        "code": 2000,
        "msg":  "success",
        "data": gin.H{"username": username},
    })
}
```
