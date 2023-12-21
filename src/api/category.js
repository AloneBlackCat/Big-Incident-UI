import request from '@/utils/request.js'

export const categoryListService = () => {
    // 获取token状态
    return request.get('/category')
}

export const addCategoryService = (value) => {
    return request.post('/category',value)
}
