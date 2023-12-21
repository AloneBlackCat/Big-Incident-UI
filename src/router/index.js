import {createRouter,createWebHistory} from 'vue-router'

import Layout from '@/views/Layout.vue'
import Login from '@/views/Login.vue'
import ArticleCategory from "@/views/article/ArticleCategory.vue";
import ArticleManage from "@/views/article/ArticleManage.vue";
import UserInfo from "@/views/user/UserInfo.vue";
import UserAvatar from "@/views/user/UserAvatar.vue";
import UserResetPassword from "@/views/user/UserResetPassword.vue";
// 定义路由关系
const routes = [
    { name: 'login' , path: '/login' , component: Login },
    {
        path: '/' ,
        component: Layout,
        redirect: '/article/manage',
        children: [
            { path: '/article/category', component: ArticleCategory },
            { path: '/article/manage', component: ArticleManage },
            { path: '/user/info', component: UserInfo },
            { path: '/user/avatar', component: UserAvatar },
            { path: '/user/password', component: UserResetPassword }
        ]
    }
]

//创建路由器
const router = createRouter({history: createWebHistory() ,routes: routes })

export default router
