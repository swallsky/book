### Cobra介绍

> Cobra是Go的Cli框架。包含一套用于创建功能强大的现代化的CLI应用程序的库，也可以用于快速生成基于Cobra的应用程序和命令文件的工具。cobra被用在很多go语言的项目中，如Kubernetes、Docker、Istio、Hugo等等

Cobra提供：

* 简单的基于子命令的命令行，例如app server、app fetch等

* 完全符合POSIX标准(包括短版本和长版本)

* 嵌套子命令

* 全局、本地和级联标志

* 使用 cobra init appname、cobra add cmdname可以很容易生成应用程序和命令

* 智能提示 ，例如：app srver… did you mean app server?

* 自动生成命令和标志

* 自动识别 -h --help等等为help的标志

* 为应用程序自动shell补全(bash、zsh、fish)

* 为应用程序自动生成手册

* 命令别名

* 灵活定义帮助、用法等

* 可选的与viper的紧密集成

### 安装

Cobra安装简单，在项目根目录下安装cobra包

```shell
go get -u github.com/spf13/cobra
```

```go
import "github.com/spf13/cobra"
```

### 概念

Cobra建立在命令、参数和标志的结构之上。

* Commands：命令，模块说明，用应说明等

* Args：参数，向应用传递参数、配置等

* Flags： 在命令行中更改代码参数的修饰符

好的应用程序在使用时，读起来像句子。用户知道如何操作和使用该程序。

通用模式如：`APPNAME VERB NOUN --ADJECTIVE.` or `APPNAME COMMAND ARG --FLAG`

例1：

```shell
hugo server --port=1313
```

例2：

```shell
git clone URL --bare
```

### 使用

通常基于Cobra应用程序将遵循以下组织结构 appName为应用目录  

```
▾ appName/
    ▾ cmd/
        add.go
        your.go
        root.go
        version.go
      main.go
```

main.go文件代码如下：

```go
package main

import (
  "{pathToYourApp}/cmd"
)

func main() {
  cmd.Execute()
}
```

根命令cmd/root.go代码如下：

```go
var rootCmd = &cobra.Command{
  Use:   "hugo",
  Short: "Hugo is a very fast static site generator",
  Long: `A Fast and Flexible Static Site Generator built with
                love by spf13 and friends in Go.
                Complete documentation is available at http://hugo.spf13.com`,
  Run: func(cmd *cobra.Command, args []string) {
    // Do Stuff Here
  },
}

func Execute() {
  if err := rootCmd.Execute(); err != nil {
    fmt.Println(err)
    os.Exit(1)
  }
}
```

子命令cmd/version.go，查询版本

```go
package cmd

import (
  "fmt"

  "github.com/spf13/cobra"
)

func init() {
  rootCmd.AddCommand(versionCmd)
}

var versionCmd = &cobra.Command{
  Use:   "version",
  Short: "Print the version number of Hugo",
  Long:  `All software has versions. This is Hugo's`,
  Run: func(cmd *cobra.Command, args []string) {
    fmt.Println("Hugo Static Site Generator v0.9 -- HEAD")
  },
}
```

#### 持久性标志

持久性标志可用于它所分配的命令以及该命令下的每个命令，为全局标志。

```go
rootCmd.PersistentFlags().BoolVarP(&Verbose, "verbose", "v", false, "verbose output")
```

#### 本地标志

还可以在本地分配一个标志，该标志仅适用于特定命令。

```go
rootCmd.Flags().StringVarP(&Source, "source", "s", "", "Source directory to read from")
```

#### 父命令上的本地标志

默认情况下，Cobra只解析target命令上的本地标志，任何本地标志父命令将被忽略。通过启用Cobra将在执目标命令之前，解析每个命令的本地标志。

Command.TraverseChildren

代码如下：

```go
command := cobra.Command{
  Use: "print [OPTIONS] [COMMANDS]",
  TraverseChildren: true,
}
```

#### 必需的标志

默认情况下，标志是可选的。相反，如果希望命令报告错误，且标记为必需时，使用下面的代码。

```go
rootCmd.Flags().StringVarP(&Region, "region", "r", "", "AWS region (required)")
rootCmd.MarkFlagRequired("region")
```

#### 参数验证

可以使用字段指定位置参数的验证，使用Args来处理参数

例如：

```go
var cmd = &cobra.Command{
  Short: "hello",
  Args: func(cmd *cobra.Command, args []string) error {
    if len(args) < 1 {
      return errors.New("requires at least one arg")
    }
    if myapp.IsValidColor(args[0]) {
      return nil
    }
    return fmt.Errorf("invalid color specified: %s", args[0])
  },
  Run: func(cmd *cobra.Command, args []string) {
    fmt.Println("Hello, World!")
  },
}
```

Cobra内置了以下验证器

- `NoArgs`- 如果有任何位置参数，该命令将报告错误。
- `ArbitraryArgs`- 该命令将接受任何参数。
- `OnlyValidArgs`- 如果 字段中没有任何位置参数，则该命令将报告错误。`ValidArgs``Command`
- `MinimumNArgs(int)`- 如果没有至少 N 个位置参数，该命令将报告错误。
- `MaximumNArgs(int)`- 如果位置参数超过 N 个，该命令将报告错误。
- `ExactArgs(int)`- 如果位置参数不完全是 N 个，该命令将报告错误。
- `ExactValidArgs(int)`= 如果没有确切的 N 个位置参数，或者有任何位置参数不在`ValidArgs``Command`
- `RangeArgs(min, max)`- 如果 args 数量不在预期 args 的最小和最大数量之间，则该命令将报告错误。

例如：

```go
package main

import (
  "fmt"
  "strings"

  "github.com/spf13/cobra"
)

func main() {
  var echoTimes int

  var cmdPrint = &cobra.Command{
    Use:   "print [string to print]",
    Short: "Print anything to the screen",
    Long: `print is for printing anything back to the screen.
For many years people have printed back to the screen.`,
    Args: cobra.MinimumNArgs(1),
    Run: func(cmd *cobra.Command, args []string) {
      fmt.Println("Print: " + strings.Join(args, " "))
    },
  }

  var cmdEcho = &cobra.Command{
    Use:   "echo [string to echo]",
    Short: "Echo anything to the screen",
    Long: `echo is for echoing anything back.
Echo works a lot like print, except it has a child command.`,
    Args: cobra.MinimumNArgs(1),
    Run: func(cmd *cobra.Command, args []string) {
      fmt.Println("Print: " + strings.Join(args, " "))
    },
  }

  var cmdTimes = &cobra.Command{
    Use:   "times [# times] [string to echo]",
    Short: "Echo anything to the screen more times",
    Long: `echo things multiple times back to the user by providing
a count and a string.`,
    Args: cobra.MinimumNArgs(1),
    Run: func(cmd *cobra.Command, args []string) {
      for i := 0; i < echoTimes; i++ {
        fmt.Println("Echo: " + strings.Join(args, " "))
      }
    },
  }

  cmdTimes.Flags().IntVarP(&echoTimes, "times", "t", 1, "times to echo the input")

  var rootCmd = &cobra.Command{Use: "app"}
  rootCmd.AddCommand(cmdPrint, cmdEcho)
  cmdEcho.AddCommand(cmdTimes)
  rootCmd.Execute()
}
```

#### 预设命令

预设命令，可以在命令函数之前或之后运行。如果子函数不声明自已的函数，则这些函数将由子函数继承。这些函数的执行顺序如下：

- `PersistentPreRun`
- `PreRun`
- `Run`
- `PostRun`
- `PersistentPostRun`

实例如下：

```go
package main

import (
  "fmt"

  "github.com/spf13/cobra"
)

func main() {

  var rootCmd = &cobra.Command{
    Use:   "root [sub]",
    Short: "My root command",
    PersistentPreRun: func(cmd *cobra.Command, args []string) {
      fmt.Printf("Inside rootCmd PersistentPreRun with args: %v\n", args)
    },
    PreRun: func(cmd *cobra.Command, args []string) {
      fmt.Printf("Inside rootCmd PreRun with args: %v\n", args)
    },
    Run: func(cmd *cobra.Command, args []string) {
      fmt.Printf("Inside rootCmd Run with args: %v\n", args)
    },
    PostRun: func(cmd *cobra.Command, args []string) {
      fmt.Printf("Inside rootCmd PostRun with args: %v\n", args)
    },
    PersistentPostRun: func(cmd *cobra.Command, args []string) {
      fmt.Printf("Inside rootCmd PersistentPostRun with args: %v\n", args)
    },
  }

  var subCmd = &cobra.Command{
    Use:   "sub [no options!]",
    Short: "My subcommand",
    PreRun: func(cmd *cobra.Command, args []string) {
      fmt.Printf("Inside subCmd PreRun with args: %v\n", args)
    },
    Run: func(cmd *cobra.Command, args []string) {
      fmt.Printf("Inside subCmd Run with args: %v\n", args)
    },
    PostRun: func(cmd *cobra.Command, args []string) {
      fmt.Printf("Inside subCmd PostRun with args: %v\n", args)
    },
    PersistentPostRun: func(cmd *cobra.Command, args []string) {
      fmt.Printf("Inside subCmd PersistentPostRun with args: %v\n", args)
    },
  }

  rootCmd.AddCommand(subCmd)

  rootCmd.SetArgs([]string{""})
  rootCmd.Execute()
  fmt.Println()
  rootCmd.SetArgs([]string{"sub", "arg1", "arg2"})
  rootCmd.Execute()
}
```
