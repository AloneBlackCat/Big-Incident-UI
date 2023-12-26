import request from "@/utils/request.js";

export const articlesService = (params) => {
    return request.get('/article/list',{params: params})
}
