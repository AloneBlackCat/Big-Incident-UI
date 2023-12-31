import axios from "axios"
import {ElMessage} from "element-plus"
import { useTokenStore } from "@/stores/token.js"
import router from '@/router'
// 记录公共的前缀
const baseURL = "/api";
const instance = axios.create({baseURL});

// 添加请求拦截器
instance.interceptors.request.use(
    (config) => {
        let tokenStore = useTokenStore()
        if (tokenStore.token) {
            config.headers.Authorization = tokenStore.token
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
// 添加响应拦截器
instance.interceptors.response.use(
    (result) => {
        if (result.data.code === 0) {
            return result.data
        }
        ElMessage.error({message: result.data.message ? result.data.message : '服务异常'});
        return Promise.reject(result.data)
    },
     (error) => {
        if (error.response.status === 401) {
            ElMessage.error('请先登录')
            router.push({
                name: 'login'
            })
        } else {
            ElMessage.error({message: "服务异常"});
        }
        // 异步状态转换为失败的状态
        return Promise.reject(error);
    }
)

export default instance;
