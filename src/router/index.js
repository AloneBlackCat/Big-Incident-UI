import {createRouter,createWebHistory} from 'vue-router'

import Layout from '@/views/Layout.vue'
import Login from '@/views/Login.vue'

// 定义路由关系
const routes = [
    {path: '/login' , component: Login},
    {path: '/' , component: Layout}
]

//创建路由器
const router = createRouter({history: createWebHistory() ,routes: routes })

export default router
