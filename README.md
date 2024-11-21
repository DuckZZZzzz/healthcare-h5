# 开发笔记

## getCurrentInstance 方法

在 main.js 文件中，导入 api 模块，并且通过 app.config.globalProperties.$api = api; 将其绑定到 Vue 应用的全局属性上。这样，在你的应用中的任何组件都可以通过 this.$api 来访问和使用这个 API 服务。
或者，通过`getCurrentInstance`方法可以获取到当前组件的实例对象，从而可以访问到组件的属性和方法。
const { proxy } = getCurrentInstance(); 这行代码做了以下几件事情：
1、调用 getCurrentInstance() 函数：这会返回当前组件的实例对象。
2、解构赋值：使用解构赋值从返回的对象中提取 proxy 属性。proxy 属性是一个响应式代理，它指向当前组件实例，可以用来访问和修改组件的状态和方法。
3、声明一个常量 proxy：将提取的 proxy 属性赋值给名为 proxy 的常量。这样，你就可以在组件的其他部分使用 proxy 来访问组件的实例。
（可以使用 proxy 来访问组件的 data、computed、methods 等，或者调用组件的生命周期钩子函数。请注意，getCurrentInstance() 只能在 setup 函数或生命周期钩子函数内部使用，因为它需要访问组件的实例上下文。在其他地方使用它可能会导致错误。）

## for in 和 for of

主要区别
遍历对象：for...in 遍历对象的属性名，而 for...of 遍历对象的值。
适用范围：for...in 可以用来遍历任何具有可枚举属性的对象，而 for...of 只能用于那些实现了迭代协议的数据结构。
性能考虑：通常情况下，for...of 比 for...in 更高效，尤其是在处理数组时。因为 for...in 实际上是为每个属性创建了一个字符串，这可能会导致一些不必要的开销。

## :show-confirm-button 为什么要冒号？右边又不是变量

这里的 :show-confirm-button="false" 实际上等价于 v-bind:show-confirm-button="false"。这意味着 show-confirm-button 属性将被绑定到一个 JavaScript 表达式的结果上，该表达式在这个例子中是一个布尔值 false。
即使 false 是一个字面量而不是一个变量，使用 v-bind 仍然有其意义，因为这表明 show-confirm-button 的值不是硬编码的，而是可以由 Vue 在运行时根据数据的变化来动态计算的。如果将来你需要改变 show-confirm-button 的值，你可以轻松地将 false 替换为一个响应式的 Vue 数据属性，而无需修改模板中的任何东西。
如果你直接写 show-confirm-button=false 而不使用 v-bind（即 :），那么 show-confirm-button 将被视为一个静态属性，并且会被解析为字符串 "false" 而不是布尔值 false。这通常不是你想要的行为，特别是当属性期望接收一个布尔值时。

## 为什么形参在使用时要用花括号包裹起来

orderList(params) {
return request.get('/order/list', { params })
}
const getOrderList = async (state) => {
const { data } = await proxy.$api.orderList({state });
console.log(data);
};

因为 axios 的用法
axios.get('/user', {
params: {
ID: 12345
}
})
要传入一个属性为 params 的对象
而 orderList 的传参要求传入一个属性为 state 的对象


## ref和reactive
ref声明的响应式变量赋值用xxx.value
reactive声明的响应式变量赋值用Object.assign(xxx, data.data)

## 怎么解决应用的计时器在后台被js暂停的问题？
