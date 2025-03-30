# API

## openify
将对应弹窗转成可以直接打开的组件
* 参数
  * `fn`: 渲染函数,根据传入的参数渲染弹窗
* 泛型参数
  * `Params`: 传递给`fn`的参数类型


## Slot
插槽组件,用于给所打开的弹窗组件一个渲染位置

* Props
  * `id`: 任意类型,会被作为`Map`的`key`
* 静态方法
  * `getById`: 根据`id`获取对应`Slot`的`open`方法,插槽未渲染时获取会拿到`undefined`
    * 参数
      * `id`: 任意类型,对应`Slot`的`id`
    * 返回: `SlotOperation`对象
    
## SlotOperation
插槽组件支持参数

* 方法
  * `open`: 在插槽上打开对应弹窗
    * 参数
      * `Comp`: 需要打开的弹窗
      * `props`: 传递给弹窗的额外参数