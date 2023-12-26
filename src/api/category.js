import request from '@/utils/request.js'

export const categoryListService = () => {
    // 获取token状态
    return request.get('/category')
}


export const addCategoryService = (data) => {
    return request.post('/category',data)
}

export const updateCategoryService = (data) => {
    return request.put('/category',data)
}


export const deleteCategoryService = (id) => {
    return request.delete(`/category?id=${id}`)
}
