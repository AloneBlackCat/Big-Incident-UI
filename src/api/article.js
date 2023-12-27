import request from "@/utils/request.js";

export const articlesService = (params) => {
    return request.get('/article/list',{params: params})
}

export const addArticleService = (data) => {
    return request.post('/article',data)
}

export const updateArticleService = (data) => {
    return request.put('/article',data)
}

export const deleteArticleService = (id) => {
    return request.delete(`/article?id=${id}`)
}
