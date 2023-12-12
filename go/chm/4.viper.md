### Go配置解析神器(简介)

> 对于Go项目而言，单个去读取命令行、环境变量、配置文件并不难，但一个一个读取却是很麻烦，有没有一个第三方库可以帮我们一次性读取上面几种数据源的配置呢？
> 
> 有的，这里推荐使用viper库，它cobra的兄弟库，在很多著名的开源项目都在使用，比如Hugo,Docker等。

### viper的功能：

- 支持配置key默认值设置
- 支持读取JSON,TOML,YAML,HCL,envfile和java properties等多种不同类型配置文件
- 可以监听配置文件的变化，并重新加载配置文件
- 读取系统环境变量的值
- 读取存储在远程配置中心的配置数据，如ectd，Consul,firestore等系统，并监听配置的变化
- 从命令行读取配置
- 从buffer读取配置
- 可以显示设置配置的值

### viper配置优先级

viper支持从多个数据源读取配置值，因此当同一个配置key在多个数据源有值时，viper读取的优先级如下：

- 显示使用Set函数设置值
- flag：命令行参数
- env：环境变量
- config：配置文件
- key/value store：key/value存储系统，如(etcd)
- default:默认值

### 安装viper

viper的安装非常简单，跟其他第三方库没有区别，只需要`go get` 命令即可。

```shell
go get github.com/spf13/viper
```

使用

```go
import "github.com/spf13/viper"
```

### 支持文件格式

viper支持多种不同的格式的配置文件，如下：

- json
- toml
- yaml
- yml
- properties
- props
- prop
- hcl
- tfvars
- dotenv
- env
- ini

viper的配置的key值是不区分大小写，如：

```go
// 小写的key
viper.set("test","this is a test value")
// 大写的key，也可以读到值
fmt.Println(viper.get("TEST"))//输出"this is a test value"
```

### 使用

使用viper.New()函数创建一个Viper Struct，如：

```go
viper := viper.New() // 初始化一个Struct
viper.SetDefault("key2","value2") // 设置默认值
```

其实，这就是Go包的编程惯例，对实现功能对象再进行封装，并通过包来调用。

因此下面示例中调用函数使用的viper，可以是指包名viper，或者通过viper.New()返回的对象。

#### 配置默认值

默认值配置，只需要使用`viper.SetDefault`即可，代码如下：

```go
viper.SetDefault("key1","value1")
viper.SetDefault("key2","value2")
```

#### 读取配置文件

直接指定文件路径，代码如下：

```go
viper.SetConfigFile("./config.yaml")
viper.ReadInConfig()
fmt.Println(viper.Get("test"))
```

多路径查找

```go
viper.SetConfigName("config")     // 配置文件名，不需要后缀名
viper.SetConfigType("yml")            // 配置文件格式
viper.AddConfigPath("/etc/appname/")  // 查找配置文件的路径
viper.AddConfigPath("$HOME/.appname") // 查找配置文件的路径
viper.AddConfigPath(".")              // 查找配置文件的路径
err := viper.ReadInConfig()           // 查找并读取配置文件
//if err != nil {                       // 处理错误
//    panic(fmt.Errorf("Fatal error config file: %w ", err))
//}
if err := viper.ReadInConfig(); err != nil {
  if _, ok := err.(viper.ConfigFileNotFoundError); ok {
    // Config file not found; ignore error if desired
  } else {
    // Config file was found but another error was produced
  }
}
```

#### 写配置文件

除了读取配置文件外，viper也支持将配置值写入配置文件，viper提供了四个函数，用于将配置写回文件。

##### WriteConfig

WriteConfig函数会将配置写入预先设置好的路径的配置文件中，如果配置文件存在则覆盖，如果没有则创建。

##### SafeWriteConfig

SafeWriterConfig与WriteConfig函数唯一的不同是如果配置文件存在，则会返回一个错误。

##### WriteConfigAs

WriteConfigAs与WriteConfig函数的不同是需要传入配置文件保存路径，viper会根据文件后缀判断写入格式。

##### SafeWriteConfigAs

SafeWriteConfigAs与WriteConfigAs的唯一不同是如果配置文件存在，则返回一个错误。

#### 监听配置文件

viper支持监听配置文件，并会在配置文件发生变化，重新读取配置文件和回调函数，这样可以避免每次配置变化时，都需要重启启动应用的麻烦。

```go
viper.OnConfigChange(func(e fsnotify.Event) {
    fmt.Println("Config file changed:", e.Name)
})

viper.WatchConfig()
```

#### 从io.Reader读取配置

除了支持从配置文件读取配置外， viper也支持从实现了io.Reader接口的实例中读取配置(其实配置文件也实现了io.Reader)，如：

```go
viper.SetConfigType("json") //设置格式

var yamlExample = []byte(`
{
    "name":"小明"
}
`)

viper.ReadConfig(bytes.NewBuffer(yamlExample))
fmt.Println(viper.Get("name")) //输出“小明”
```

#### 显示设置配置项

可以使用`Set`函数显示的为某个key设置值，这种方式的优先级最高，会覆盖该key在其他地方的值，如：

```go
viper.SetConfigType("json") //设置格式

var yamlExample = []byte(`
{
    "name":"小明"
}
`)

viper.ReadConfig(bytes.NewBuffer(yamlExample))
fmt.Println(viper.Get("name")) //输出:小明

viper.Set("name","test")

fmt.Println(viper.Get("name"))//输出:test
```

#### 注册和使用别名

为某个配置key设置别名，这样可以方便我们在不改变key的情况下，使用别名访问该配置。

```go
iper.Set("name", "test")

//为name设置一个username的别名
viper.RegisterAlias("username, "name")

//通过username可以读取到name的值
fmt.Println(viper.Get("username"))

//修改name的配置值，username的值也发生改变
viper.Set("name", "小明")

fmt.Println(viper.Get("username"))

//修改username的值，name的值也发生改变
viper.Set("username", "测试")

fmt.Println(viper.Get("name"))
```

#### 读取环境变量

对于读取操作系统环境变量，viper提供了下面五个函数：

- AutomaticEnv()
- BindEnv(string...) : error
- SetEnvPrefix(string)
- SetEnvKeyReplacer(string...) *strings.Replacer
- AllowEmptyEnv(bool)
1. 可以使用AutomaticEnv函数来读取环境变量

```go
fmt.Println(viper.Get("path"))

//开始读取环境变量，如果没有调用这个函数，则下面无法读取到path的值
viper.AutomaticEnv()

//会从环境变量读取到该值，注意不用区分大小写
fmt.Println(viper.Get("path"))
```

2. 使用BindEnv绑定某个环境变量

```go
//将p绑定到环境变量PATH,注意这里第二个参数是环境变量，这里是区分大小写的
viper.BindEnv("p", "PATH")

//错误绑定方式，path为小写，无法读取到PATH的值
//viper.BindEnv("p","path")

fmt.Println(viper.Get("p"))//通过p可以读取PATH的值
```

#### 与命令行参数搭配使用

viper可以和解析命令行库相关flag库一起工作，从命令行读取配置，其内置对pflag库的支持，同时也留有接口让我们可以支持扩展其他的flag库

基于pflag的代码如下：

```go
pflag.Int("port", 8080, "server http port")

pflag.Parse()
viper.BindPFlags(pflag.CommandLine)

fmt.Println(viper.GetInt("port"))//输出8080
```

#### 远程key/value存储支持

viper支持存储或者读取远程配置存储中心和NoSQL(目前支持etcd,Consul,firestore)的配置，并可以实时监听配置的变化，不过需要在代码中引入下面的包：

```go
import _ "github.com/spf13/viper/remote"
```

现在远程配置中心存储着以下JSON的配置信息

```json
{
    "hostname":"localhost",
    "port":"8080"
}
```

可以通过下面的方面连接到系统，并读取配置，也可以单独开启一个Goroutine实时监听配置的变化。

#### 访问配置函数

viper提供了以下访问配置的函数：

- Get(key string) : interface{}
- GetBool(key string) : bool
- GetFloat64(key string) : float64
- GetInt(key string) : int
- GetIntSlice(key string) : []int
- GetString(key string) : string
- GetStringMap(key string) : map[string]interface{}
- GetStringMapString(key string) : map[string]string
- GetStringSlice(key string) : []string
- GetTime(key string) : time.Time
- GetDuration(key string) : time.Duration

#### 判断配置key是否存在

```go
if viper.IsSet("user"){
    fmt.Println("key user is not exists")
}
```

#### 打印所有配置

```go
m := viper.AllSettings()
fmt.Println(m)
```
