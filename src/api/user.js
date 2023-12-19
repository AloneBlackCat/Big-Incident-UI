// 导入request.js请求工具
import request from "@/utils/request.js"

// 用户注册接口
export const userRegisterService = (registerData) => {
    const params = new URLSearchParams()
    for (let key in registerData) {
        params.append(key,registerData[key])
    }
    return request.post('/user/register',params)
}

// 用户登录
export const userLoginService = (loginData) => {
    const params = new URLSearchParams()
    for (let key in loginData) {
        params.append(key,loginData[key])
    }
    return request.post('/user/login',params)
}
