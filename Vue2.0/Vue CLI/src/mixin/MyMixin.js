// 1.可以写像生命周期函数等其他配置项,只用有相同的,都可以写成"mixin"
// 2.如果mixin的数据与组件的数据名称相同,那么使用组件的数据;
// 如果是生命周期函数发生冲突,那么两个都会执行
export const MyMixin = {
    methods: {
        showMixin() {
            alert("mixin");
        }
    },
};