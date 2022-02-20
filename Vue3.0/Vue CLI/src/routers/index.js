import { createRouter, createWebHashHistory } from 'vue-router';
// 引入组件
import Home from '../components/Home.vue';

export const router = createRouter({
    // "createWebHashHistory"开启"hash"工作模式
    // "createWebHistory"开启"history"工作模式
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Home
        }
    ]
});
