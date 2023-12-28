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

// 获取用户信息
export const userInfoService = () => {
    return request.get('/user/userInfo')
}

export const updateUserInfoService = (data) => {
    return request.put('/user/update',data)
}

export const updateAvatarService = (avatarUrl) => {
    const params = new URLSearchParams()
    params.append('avatarUrl',avatarUrl)
    return request.patch('/user/updateAvatar',params)
}

export const updatePwdService = (pwd) => {
    return request.patch('/user/updatePwd',pwd)
}
