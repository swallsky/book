## React通信方式

> React是一种用于构建用户界面的JavaScript库。在开发React应用程序时，组件之间的通信是非常重要的。React提供了多种通信方式，以便于组件之间的数据传递和交互。

### 单向数据流

> React推崇的是单向数据流的思想，也就是说数据的流动是单向的，从父组件向子组件传递。父组件通过props将数据传递给子组件，在子组件中通过props来获取传递过来的数据。这种单向数据流的方式保证了数据的可控性和可预测性。

#### 父组件向子组件传递数据

父组件通过props向子组件传递数据和方法

父组件代码(Father.tsx)

```js
import React from "react";
import Child from "./Child";
const Father = ()=>{
    const Play = ()=>{
        console.log("Play Child");
    }
    return (
        <>
            <div>子组件信息</div>
            <Child title="标题" Play={Play} />
        </>
    )
}
export default Father;
```

子组件代码(Child.tsx)

```js
import React,{ FC } from "react";
// 定义传递的属性或者方法
interface Props {
    title:String; //父级传递的属性
    Play: Function; //父级方法
}

const Child:FC<Props> = (props)=>{
    return (
        <>
            <div>{props.title}</div>
            <div onClick={()=>props.Play()}>查看父级的play方法</div>
        </>
    )
}
export default Child;
```

#### 子组件向父组件传递方法

> 子组件向父组件提供公有的方法或属性，需要通过父组件引用useRef(null)方法，引用子组件的公开方法和属性，子组件则通过forwardRef,以及useImperativeHandle方法向父组件公开相应的方法和属性

父组件代码(Father.tsx)

```js
import React, { useRef } from "react";
import Child from "./Child";
const Father = ()=>{
    const childRef = useRef(null); //引用子组
    const Play = ()=>{
        console.log("Play Child");
    }
    return (
        <>
            <div>子组件信息</div>
            <Child ref={childRef} title="标题" Play={Play} />
            <div onClick={()=>childRef.current?.resetForm()}>执行子组件方法</div>
        </>
    )
}
export default Father;
```

子组件代码(Child.tsx)

```js
import React,{ forwardRef, useImperativeHandle } from "react";
// 定义传递的属性或者方法
interface Props {
    title:String; //父级传递的属性
    Play: Function; //父级方法
}
// 给父级传递的公开方法
export interface IRefProps {
  resetForm: ()=>void;
}

const Child = forwardRef<IRefProps,Props>((props,ref)=>{
    // 给父组件公共方法
  useImperativeHandle(ref,()=>{
    return {
      resetForm:()=>{// 向父级公开方法
        console.log("Child Console!");
      }
    }
  });
    return (
        <>
            <div>{props.title}</div>
            <div onClick={()=>props.Play()}>查看父级的play方法</div>
        </>
    )
});
export default Child;
```
