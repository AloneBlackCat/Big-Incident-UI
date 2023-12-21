import request from '@/utils/request.js'

export const categoryListService = () => {
    // 获取token状态
    return request.get('/category')
}
