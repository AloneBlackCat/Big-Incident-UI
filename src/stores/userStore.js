import {defineStore} from 'pinia'
import {reactive} from "vue";

const userInfoStore = defineStore('user', () => {
    const user = reactive({
        createTime: null,
        email: null,
        id: null,
        nickName: null,
        updateTime: null,
        userPic: null,
        username: null
    })

    const setUser = (newUser) => {
        Object.assign(user, newUser)
    }

    const removeUser = () => {
        Object.keys(user).forEach(key => {
            user[key] = null
        })
    }

    return {user, setUser, removeUser}
})

export default userInfoStore
