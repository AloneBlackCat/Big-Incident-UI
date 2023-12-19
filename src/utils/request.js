import axios from "axios"
// 记录公共的前缀
const baseURL = "/api";
const instance = axios.create({baseURL});

// 添加响应拦截器
instance.interceptors.response.use(
    result=>{
        return result.data;
    },
    error => {
        alert("服务异常");
        // 异步状态转换为失败的状态
        return Promise.reject(error);
    }
)

export default instance;
