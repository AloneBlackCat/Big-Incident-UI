import request from '@/utils/request.js'
import { useTokenStore } from '@/stores/token.js'

export const categoryListService = () => {
    // 获取token状态
    const tokenStore = useTokenStore()
    return request.get('/category', {
        headers: {
            'Authorization' : tokenStore.token
        }
    })
}
