import request from '@/utils/request.js'

export const categoryListService = () => {
    return request.get('/category')
}
