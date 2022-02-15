/*
* 这里使用了ES6的引入语法,由于仅写包的名称,
* 因此引入的文件将由vue下的"package.json"的"module"属性指定,
* 而此时"module"指定的是没有模板解析器的"vue.runtime.js",
* 那么此时如果需要渲染页面,需要借助下面的"render"函数,
* 而如果需要存在模板解析器的"vue.js",可以在同级目录的"dist"中寻找.
* 【注】:这么做的原因是在生产环境中可以大大缩小文件的体积
*/
import Vue from 'vue'
// App组件管理其他组件,而其直接由vm管理
import App from './App.vue'

Vue.config.productionTip = false

// 全局使用混合 Vue.mixin(...);

// 引入插件
import MyPlugin from './plugins/MyPlugin'
Vue.use(MyPlugin, 1, 2, 3);

/*
* 全局事件总线:通过某个所有组件都可见的中间组件,实现任意两个组件的数据交互
* 1.必要条件:
*   (1)所有组件都可见:
*     - "window":所框架都存在"window"对象,方法可行但是不好
*     - "VueComponent":需要修改Vue的源码,耍赖皮
*     - "Vue"原型:由于存在"VueComponent.prototype.__proto__ == Vue.prototype",
*     因此可以采取该方法,组件会顺着原型链寻找到Vue原型对象上的属性.
*   (2)可以调用"$on","$off"和"$emit"等方法(这些方法都在Vue原型对象上):
*     - 使用"VueComponent"(类似于傀儡)
*         const middleware = Vue.extend({});
*         Vue.prototype.middleware = middleware;
*     - 使用"Vue"原型
*         Vue.prototype.middleware = this;
*         首先如果使用Vue原型对象,第一个想法为:
*         `
*           const vm = new Vue({...});
*           Vue.prototype.middleware = vm;
*         `
*         但是这么写不行,当执行完第一句时,页面已经渲染完毕,此时在进行第二句的定义属性晚了;
*         因此需要用到生命周期函数中的"beforeCreate",而我们约定使用"$bus"表示全局事件总线.
*   【PS】:除了对上述的事件总线的实现外,还可以看到用"消息的订阅与发布"的实现,其作用类似事件总线,
*    实现消息的订阅和发布的JS库很多,这里使用了"pubsub-js"库,使用"npm install pubsub-js"安装.
*/

// 引入路由
import VueRouter from "vue-router";
Vue.use(VueRouter);
// 引入路由器
import router from "./routers";

new Vue({
  el: "#app",
  // "render"函数的完整写法
  // render(createElement) {
  //    return createElement("h1", "Vue");
  // }
  render: h => h(App),
  beforeCreate() {
    // 安装全局事件总线
    Vue.prototype.$bus = this;
  },
  router: router
});
