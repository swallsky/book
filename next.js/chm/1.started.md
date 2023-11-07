### Next.js 介绍

#### Next.js是什么

> Next.js是一个用于构建全栈Web应用程序的React框架。它提供了一种简单而高效的方式来构建服务器端渲染(SSR)和静态网站(SSG)应用程序。它是由zeit公司开发的，一个开源项目，拥有广泛的社区 支持和丰富的插件生态系统。

##### 主要特点

1. 服务器端渲染(SSR): Next.js支持服务器端渲染，这使得应用程序在服务器上预先渲染，从而提高页面加载速度和搜索引擎优化(SEO)。Next.js提供了内置的API和钩子，使开发能够轻松地实现SSR。

2. 静态网站生成(SSG)：Next.js还支持静态网站生成，这是一种构建网站的新方法，它充许开发人员在构建时预先生成静态页面。这种方法可以提高性能和可扩展性，并且不需要任何服务器端渲染。

3. 集成API：Next.js充许将API集成到应用程序中，从而提供更好的数据管理和安全性。它支持Auth、Netlify、Algolia等。

4. 自动代码分割：Next.js通过自动代码分割提供更好的应用程序性能。它可以将JavaScript代码拆分成多个小块，以减少初始加载时间和带宽消耗。

5. 热模块替换(HMR)：Next.js支寺热模块替换，在开发过程中更新已加载模块的技术。帮助开发时，更快地迭代和测试代码。

6. 数据预取：Next.js提供了一种内置的方法来预取数据，可以预先加载和缓存数据，从而提高应用程序的性能和响应速度。

7. 自定义页面路由：基于文件系统的路由，构建在服务器组件之上，支持布局、嵌套路由、加载状态、错误处理等。

8. 国际化：Next.js支持多语言和国际化，可以根据不同地区和语言的用户自动切换。

9. 插件生态系统：Next.js具有丰富的插件生态系统，提供了许多现成的插件来扩展其功能。

10. 与其他库和框架集成：Next.js可以与其他流的库和框架集成，如Formik、GraphQL、React Native等。

#### 安装

> 要求
> 
> * Node.js >= v16.14

##### 自动安装

> 使用create-next-app安装，它会自动设置所有内容。
> 
> > ```shell
> > npx create-next-app@latest
> > ```
> 
> 安装时，根据提示选择。
> 
> 说明：
> 
> * Next.js默认附带TypeScript、ESLint和TailWind CSS配置。
> 
> * 你可以选择使用src目录以将应用程序的代码与配置文件分开。

##### 手动安装

若要手动创建新的Next.js应用，请安装所需的包：

```js
npm install next@latest react@latest react-dom@latest
```

添加package.json的scripts命令：

```js
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

这些脚本命令对应不同的阶段：

* dev：运行next dev以开发模式启动Next.js。

* build：运行next build生成用于生产的应用。

* start：运行next start以启动Next.js生产服务器。

* lint：运行next lint设置Next.js的内置ESLint配置。

**创建目录**

> Next.js使用文件系统路由，这意味着应用程序中的路由由您构建文件的方式决定。

目录 app

对应新应用程序，我们建议使用App Router。该路由充许您使用React的最新功能，并且是基于社区反馈的Pages Router演变来的。

创建首页

app/layout.tsx   项目根布局必须

app/page.tsx  项目首页

#### 项目结构

> 介绍Next.js项目的文件和文件夹结构。

##### 根目录说明

* app  或 src/app    应用路由(App Router)， v13新增的功能

* pages  页面路由(Pages Router)   兼容历史版本

* public 静态资源目录

* src 可选应用程序源文件夹

**注意**

> Next.js 13中两种路由模式可以共存，但App Router的优先级高于Pages Router。两者都是基于文件的路由，都是基于文件的目录自动生成路由，不需要手动配置，但是两者的规则不太一样。
> 
> 项目启动时默认加载的首页页面冲突问题：
> 
> 当src/app/page.tsx默认首页文件存在的时候，此页面将作为默认启动页面。如果此时在pages目录下又新建了index.tsx页面，就会和src/app/page.tsx中的页面产生冲突，导致首页无法正常加载。因此两者只存在一个即可，另外一个相关文件要删除！

##### 两种路由的区别

> 两种路由规则的区别，Pages Router是以文件路径作为路由路径，App Router是以文件夹的路径为路由路径，该文件夹下的文件为该页面的UI元素组件，比如page.tsx文件作为页面组件文件，error.tsx出错时的fallback组件文件等。

**示例**

|              | pages                                      | app                        |
| ------------ | ------------------------------------------ | -------------------------- |
| /            | ./pages/index.tsx                          | ./app/page.tsx             |
| /admin       | ./pages/admin.tsx, ./pages/admin/index.tsx | ./app/admin/page.tsx       |
| ./blog/:slug | ./pages/blog/[slug].tsx                    | ./app/blog/[slug]/page.tsx |

**优缺点**

| 特点       | 应用路由(App Router) | 页面路由(Pages Router) |
| -------- | ---------------- | ------------------ |
| 路由类型     | 默认服务器组件          | 默认客户端组件            |
| 支持服务器组件  | 是                | 没有                 |
| 复杂性      | 更复杂              | 更简单                |
| 性能       | 更好               | 一般                 |
| 扩展性(灵活性) | 更好               | 不太好                |

#### 应用路由(App Router)

> 在React 18之前，React应用的渲染都是重客户端的，即使是SSR，也要在客户执行繁重的水合操作。在React 18中引入了一个新的概念 -- React Server Components，即React服务端组件，简称RSC，它可以在编译时或服务端运行。有了服务端组件，当然也有客户组件与之对应，在组件文件的开始使用'use server'和'use client'指令来区分两种组件。
> 
> 目前支持服务端组件的框架只有Next.js 13，在Next.js 13的App目录下的所有组件默认为服务端组件，如果想要使用客户端组件，那在文件开头加‘use client’指令即可。
> 
> 服务端组件带来以下好处：
> 
> * 减小客户端JavaScript体积：因为服务端组件的逻辑都是在服务端执行后生成HTML返回给浏览器的，浏览器端不需要加一些多余的JS文件，比如代码高亮、Markdown渲染等，返回给客户端是渲染后的内容，不需要把用的这些包文件返回；
> 
> * 渐进水合：本质上来说服务端组件是不需要水合的，但一些页面交互需要用客户端实现，所以一个页面上还是会有一些客户端组件的，这些客户端组件可以各自进行水合操作，不会阻塞主线程；
> 
> * 组件具备服务端能力：因为服务端组件是运行在服务端的Node.js环境中，所以它具备完整的Node.js能力，比如可以直接读取数据库、读取服务器上的文件等；
> 
> 应用路由为v13版本新功能，应用路由基于文件系统的路由器，其中文件夹用于定义路由。每个文件夹都会映射到路由段。若要创建嵌套路由可在文件夹嵌套中完成。文件夹中的page.js,page.ts,page.tsx等是路由可公开访问的。
> 
> 例如：
> 
> /dashboard/analytics/page.js   =>   /dashboard/analytics

##### 创建首页

> 在app(或src/app)目录下，创建首页page.tsx，代码如下：

```js
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
```

对应访问路径为：/

##### 页面和布局

> Next.js 13中的应用程序路由引入了新的文件约定，可以轻松的创建页面、共享布局和模板。

**页面**

页面路由是由文件夹路径和文件夹下的page.js(page.tsx,page.ts)等构成。

例如

* app/page.tsx     =>   /

* app/dashboard/page.tsx   =>   /dashboard

**布局**

布局是可以在多个页面之间共享，在访问量，布局不能单独呈现，布局也可以嵌套。

在文件夹下创建layout.js (layout.jsx、layout.tsx)为约定的布局页面。

例如

```js
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav></nav>

      {children}
    </section>
  )
}
```

**注意：**

* 最上面的布局称为根布局，是必须的，是所有页面共有的，根布局必须包含html、body标签。

* 任何路由段都可以定义自已的布局。这个布局将在所属下级文件夹中共享。

* 默认情况下，路由中的布局是嵌套的。每个父布局都使用React的children属性将页面包含在其中。

* 可以使用路由组选择加入和退出共享布局的特定路由段。

* 默认情况下布局是服务器组件，但可以设置为客户端组件。

* 在布局中可以获取数据。

* 无法在父布局及期子布局之间传递数据。但是可以在路由中多次获取相同数据，React会自动删除重复的数据，而不影响性能。

* 布局无权访问其下方的路径段。要访问所有路由段，可以客户端组件中使用[`useSelectedLayoutSegment`](https://nextjs.org/docs/app/api-reference/functions/use-selected-layout-segment)或[`useSelectedLayoutSegments`](https://nextjs.org/docs/app/api-reference/functions/use-selected-layout-segments)。

* .js、.jsx、tsx都可以用于布局文件

**根布局(必须)**

> 根布局在目录的顶层定义，并应用于所有路由。通过此布局，可以修改从服务器返回的初始html

代码示例(app/layout.tsx)：

```js
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

* 该布局必须在app根目录下

* 该布局必须包含html、body标签

* 可以使用路由组创建多个根布局。

##### 嵌套布局

> 在文件夹中定义的布局适用当前特定的路由段，并在这些路由段中进行渲染。默认情况下，文件夹层次结构中的布局是嵌套的，这意味着它们通过参数prop来包装子布局。

例如 app/dashboard/layout.tsx

```js
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
```

如果要组合上述两个布局，则根布局将把dashboard/layout.tsx当子组件，包装在其中，嵌套顺序为

app/layout.tsx  => /app/dashboard/layout.tsx  =>  /app/dashboard/*

可以使用路由组选择加入和退出共享布局的特定的路由段。

##### 模板

> 模板与布局类似，但是路由变化时会重新执行。
> 
> 在某些情况下，可能需要这些特定行为，而模板将比布局更合适，例如
> 
> * 不同页面，布局稍有差异
> * 有一些特定用户形为，例如页面浏览量等



#### 页面路由(Pages  Router)

> 在next.js中，路由是根据目录和文件名与路由相关联，本章节，主要讲解pages页面路由的路由规则，如果之前使用过next.js，本章可跳过。

例如：文件：pages/about.js，对应的路由为/about

```js
export default function About() {
  return <div>About</div>
}
```

##### 索引路由

> 根据文件名自动索引路由，例如
> 
> * pages/index.js   =>       /
> 
> * pages/blog/index.js  =>   /blog

##### 嵌套路由

> 路由支持多层嵌套，多层文件夹时，路由自动识别和匹配。
> 
> * pages/blog/first-post.js   =>   /blog/first-post
> 
> * pages/dashboard/settings/usename.js  =>  /dashboard/settings/usename

##### 动态路由

> Next.js 支持具有动态路由的页面。例如
> 
> * pages/post/[id].js   =>   /posts/1   posts/2

##### 布局模式

> 基于React的布局，例如页面的导航栏和页脚。

```js
import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
```

#### Next.js 13渲染方式

##### SSR

**app路由**

在app路由下，只要我们的组件是使用 async进行了修饰，都会默认开启SSR。

```js
export default async function PokemonName({ params }: { params: { name: string } }) {
  const { name } = params;

  const res = (await fetch('http://localhost:3000/api/pokemon?name=' + name)) as any;
  const resdata = await res.json();
  const { data } = resdata;

  return (
      //...
  );
}
```

**pages路由**

在pages路由下，如果要开启SSR，需要实现 getServerSideProps 这个API，在请求页面的时候，提前获取到数据，然后传入组件中。

```js
export async function getServerSideProps(context: any) {
  const data = await getPokemon(null, context.params.name);
  return {
    props: {
      data: data,
    },
  };
}

const PokemonName = ({ data }: any) => {

  return (
        //...
  );
};
```

##### SSG

> SSG生成静态站点，其渲染流程与SSR类似，不同的是第一步不是在用户请时在服务端执行，而是在编译阶段就完成，整个站点最后生成的都是一些静态文件，部署时也不需要启动Node服务。

##### CSR

> 客户端渲染就比较简单了，如果用到了useEffect中获取数据或其他在浏览器请求数据的方式，都可以算作是客户端渲染。

##### ISR

> ISR是指增量静态生成，当网站有特别多的页面，并且使用SSG的方式，编译阶段需要大量的时间，ISR就是为了解决这个问题，它在编译阶段只生成部分页面，其他页面在用户请求时按需渲染并缓存起来，本质上算是SSG和SSR的结合体。

**什么是水合**

> 简单来说是React 基于虚拟DOM工作的，而SSR时服务端生成HTML是真实的DOM，并且这些DOM节点没有做事件监听等，所以需要一步操作将这些真实DOM与虚拟DOM做映射，并添加事件绑定等能力，后续页面的操作才能由React来接管，这个过程叫做水合。

#### 获取数据

> 不论是 Pages Router还是App Router，数据获取可分为三类：客户端获取、服务端获取和编译时获取。

##### 客户端获取

> 客户端获取是React的常规逻辑，在这两种路由方式上没有任何区别，都是在组件的生命周期中执行。

代码如下：

```js
export default function Page() {
  useEffect(() => {
    fetch('/api/xxx'); // 页面加载后请求接口
  }, []);

  return <div>xxx</div>;
}
```

##### 服务端获取

**App Router**

    App Router完全依靠React服务端组件的能力，在服务端组件中可以直接执行一些异步请求即可

    代码如下：

```js
export default async function Page() {
  // 发起 HTTP 请求
  const data = await fetch('https://www.example.com/api/user');
  // 或者直接读取数据库
  const data = await db.user.findOne({ where: {...} });

  return <div>{data.xxx}</div>;
}
```

Next.js 13中的fetch并非WHATWG标准中定义的fetch，Next.js在其基础上做了一些特殊处理，增加缓存相关的参数和一些去重逻辑。

默认情况下，fetch请求会永久缓存，它在编译阶段就会执行，如果需要在每次页面请求时都执行，则把缓存设置为不缓存或缓存一段时间即可。

另外这些请求都可以是组件维度的，而不限于页面维度，所以可能会出现一个页面的执行同一个fetch请求的情况，Next.js会自动处理这些重复的请求，保证渲染一个页面时不会重复发送同一个fetch请求。

**Pages Router**

    使用函数 **getServerSideProps**： 用于在SSR模式，在每次请求页面时都会执行，并将返回的props注入返回的props注入页面中

    代码如下：

```js
export default function Page({...}) {
  return <div>xxx</div>;
}

export async function getServerSideProps(context: any) {
  const data = await fetch('https://api.github.com/repos/vercel/next.js');
  return {
    props: {
      data: data,
    },
  };
}
```

##### 编译时获取

> 编译时获取数据，主要是Pages Router有特定的函数处理对应的事件，而App Router则完全依耐React服务端组件的能力，没有这么多API。

Pages Router编译时函数

**getStaticProps**  用于 SSG 模式，在编译时就执行，然后将返回的 `props` 注入到页面中

**getStaticPaths**  用于 SSG 模式和动态路由下，需要返回一个 `paths` 数据，用于表示当前动态路由一共有哪些页面需要生成

代码如下：

```js
export default function Page({...}) {
  return <div>xxx</div>;
}
// 返回的 props 将会作为 Page 组件的 props
export const getStaticProps = async () => {
  return { props: {...} }
};


// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}
```

#### 其他

> 路由、渲染、数据请求是一个框架最核心的功能，除些之外，Next.js也提供了一些其他好的好用功能。

#### Image

> Next.js提供了一个Image组件用于在页面上展示图片，相较于img标签，它有一些增强能力：
> 
> * 尺寸优化：它可以根据设备类型自动提供最优尺寸的图片，也会根据客户端的支持程度提供更现代的图片格式，比如WebP或AVIF等;
> 
> * CLS优化： 它会在图片加载完成之前自动进行占位，防止出现布局偏移导致页面性能下降；
> 
> * 懒加载：默认当图片在可视区域内时，才加载图片；

#### Metadata

> Next.js对SEO支持性很好，默认支持Meta信息方式。

**Pages Router**

在Pages Router中使用Head组件:

代码如下：

```js
import Head from 'next/head';

export default function Page() {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <p>xxx</p>
    </div>
  );
}
```

**App Router**

在App Router中提供了两种方式：

一是配置式的

        在layout.tsx或page.tsx中导出metadata对象或generateMetadata函数：

代码如下：

```js
// 导出 metadata 对象
export const metadata: Metadata = { title: '...', description: '...' };

// 或者导出 generateMetadata 函数
export const generateMetadata = async (props) => {
  return { title: '...', description: '...' };
};

export default function Page() {
  // ...
}
```

二是基于文件的方式

        比如favicon、icon、apple-ico、opengraph-image、robots.txt等这些可以直接放一个文件在app目录中，如果这些文件需要动态生成，也可以放一个同名的JS/TS文件，文件中默认导出一个函数来生成就可以了。
