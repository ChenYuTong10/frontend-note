// 引入应用工厂函数"createApp",不在引入"Vue"的构造函数
import { createApp } from 'vue';
import App from './App.vue';

// 创建应用实例对象,类似"Vue2"中的"vm",但是更"轻"
const app = createApp(App);
app.mount('#app');

// 在"Vue2"中的进行全局配置,自定义指令等,在"Vue3"中差不多
// 只不过是将"Vue"换成了"app",当然也是有一些差异的,详情见图片
// 像"Vue2"中的过滤器在"Vue3"被废除了等更多改变可以参考官网

/*
*   Vue2的写法:
*   const vm = new Vue({
*       render: h => h(App)
*   });
*   vm.$mount("#app");
*/
