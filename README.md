# 开发笔记
## getCurrentInstance方法
在 main.js 文件中，导入 api 模块，并且通过 app.config.globalProperties.$api = api; 将其绑定到 Vue 应用的全局属性上。这样，在你的应用中的任何组件都可以通过 this.$api 来访问和使用这个 API 服务。
或者，通过`getCurrentInstance`方法可以获取到当前组件的实例对象，从而可以访问到组件的属性和方法。
const { proxy } = getCurrentInstance(); 这行代码做了以下几件事情：
1、调用 getCurrentInstance() 函数：这会返回当前组件的实例对象。
2、解构赋值：使用解构赋值从返回的对象中提取 proxy 属性。proxy 属性是一个响应式代理，它指向当前组件实例，可以用来访问和修改组件的状态和方法。
3、声明一个常量 proxy：将提取的 proxy 属性赋值给名为 proxy 的常量。这样，你就可以在组件的其他部分使用 proxy 来访问组件的实例。
（可以使用 proxy 来访问组件的 data、computed、methods 等，或者调用组件的生命周期钩子函数。请注意，getCurrentInstance() 只能在 setup 函数或生命周期钩子函数内部使用，因为它需要访问组件的实例上下文。在其他地方使用它可能会导致错误。）