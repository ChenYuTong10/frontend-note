// 专门创建整个项目的路由器
import VueRouter from "vue-router";
// 引入对应的组件
import MyFirstRouter from "../pages/MyFirstRouter";
import MySecondRouter from "../pages/MySecondRouter";
import MyFirstChild from "../pages/MyFirstChild";
import MySecondChild from "../pages/MySecondChild";
import MyQueryChild from "../pages/MyQueryChild";
import MyParamsChild from "../pages/MyParamsChild";

// 创建路由器
const vr = new VueRouter({
    mode: "hash",
    // 一级路由
    routes: [
        {
            path: '/myFirstRouter',
            component: MyFirstRouter,
            // 二级路由
            children: [
                {
                    path: "myFirstChild",
                    component: MyFirstChild
                },
                {
                    path: "mySecondChild",
                    component: MySecondChild
                }
            ],
            // 存放自定义的一些数据
            meta: {
                isAuth: true  // 比如用于判断跳转到该组件时需不需要鉴权
            },
            // 独享路由守卫:仅属于某个组件,其余与"beforeEach"相同
            // 只有前置守卫,没有后置守卫
            beforeEnter: (to, from, next)=>{}
        },
        {
            path: '/mySecondRouter',
            component: MySecondRouter,
            // 路由传参
            children: [
                {
                    // 为路由命名,在配置跳转路径的时候,可以用名称代替"path"
                    name: 'queryLuyou',
                    path: "myQueryChild",
                    component: MyQueryChild
                },
                {
                    name: 'paramsLuyou',
                    // ":id"和":message"为"params"占位符
                    path: "myParamsChild/:id/:message",
                    component: MyParamsChild,
                    // "props"属性可以将参数传递给组件,组件配置好接受的属性后,
                    // 那么就不需要再写"this.$route.xxx"获取对应的值了
                    // 第一种方式:以对象的"key-value"形式传递给组件
                    // props: {
                    //     id: 1,
                    //     message: "我是你爸爸"
                    // }
                    // 第二种方式:将所有收到的"params"参数传递给组件
                    // props: true
                    // 第三种方式:函数的形式且函数的参数为"$route"
                    // props: function($route) {
                    //     return {
                    //         id: $route.params.id,
                    //         message: $route.params.message
                    //     }
                    // }
                }
            ]
        }
    ]
});

/*
*   路由守卫:
*   1.俗称为"权限检查",类似后端的拦截器,中间件等;
*   2.前端的路由守卫可以防止某种情况跳转到某个页面,比如未登录却可以访问已登录的页面,
*   而后端的拦截器等是防止某种情况下对外提供数据,比如未登录不提供个人信息等,两个需要相辅相成.
*/

// 全局前置路由守卫
// 当页面初始化或者组件切换前,调用函数进行校验
// 通常用于判断是否有权限跳转到某个页面,比如已登陆的界面
vr.beforeEach((to, from, next)=>{
    // "to"为切换后的组件,"from"为切换前的组件,两者为对象
    // "next"是放行函数,当允许切换时,调用其放行
    console.log(to, from);
    next();
});

// 全局后置路由守卫
// 当页面初始化或者组件切换后,调用函数进行校验
// 通常用于页面细节的调整,比如切换组件后,页面的标题也更改
vr.afterEach((to, from)=>{
    console.log(to, from);
});

// 还有一种守卫:组件内部守卫

/*
*   路由的两种工作模式
*   1."hash":比较直接的感受就是页面的"url"中存在"/#/",比如"http://xxx:xxx/#/home",
*   "/#/"后面的内容都是作为哈希值不会发送给服务端,即只会请求"http://xxx:xxx";
*   2."history":没有"/#/",比如"http://xxx:xxx/home",请求时会老老实实请求"http://xxx:xxx/home".
*   
*   两者的区别:
*   (1)兼容:"hash"模式的兼容性较好,而"history"模式兼容性差一丁点,估计又是IE;
*   (2)部署:使用"hash"模式,由于"/#/"后的内容不会发送给服务器,因此当页面处于"http://xxx:xxx/#/home"时刷新页面,
*   其请求的内容还是"http://xxx:xxx";使用"history"模式恰恰不同,会请求"http://xxx:xxx/home",然而"/home"路由
*   都是前端的组件之间切换的结果,如果老老实实请求"http://xxx:xxx/home",后端不做处理,直接报错404.
*   【PS】:部署的问题可以通过"nginx"进行代理分发解决.
*/

// 暴露路由器
export default vr;