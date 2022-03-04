import { createRouter, createWebHashHistory } from 'vue-router';
// 引入组件
import Home from '../components/Home.vue';
import About from '../components/About.vue';

export const router = createRouter({
    // "createWebHashHistory"开启"hash"工作模式
    // "createWebHistory"开启"history"工作模式
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            // "params"传参多面向访问资源
            path: '/about/:id/:name',
            name: 'About',
            component: About
        }
    ]
});
