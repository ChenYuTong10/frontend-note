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
            // "params"传参多面向访问资源,而且需要与目的组件的"name"结合
            path: '/about/:id/:name',
            name: 'About',
            component: About
        }
    ]
});

// 在"Vue3"访问"router"和"route"的方法
// "Vue3"官方的提供了分别提供了"useRouter"和"useRoute"方法获取"router"和"route"对象
