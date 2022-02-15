// 插件的本质是一个对象且其属性中必须存在名称为"install"方法
export default {
    install(Vue, x, y, z) {
        // "install"函数的第一个参数是Vue的构造函数
        // 其余参数是在"main.js"中"Vue.use()"传入的参数

        // 由于存在Vue的构造函数,之前所有使用到的"Vue.xxx"都可以在这里使用
        // 比如:Vue.filter(),Vue.directive(),Vue.mixin(),Vue.prototype
        // 而且这么定义是全局范围内的,因此插件很强大
    }
};