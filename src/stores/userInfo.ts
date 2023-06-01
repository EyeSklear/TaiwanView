import { defineStore } from 'pinia'
import { setToken, clear, clearRouter } from '@/utils/auth'
import router from '@/router'
import { useRouter } from "vue-router"
import {login, getUserInfo} from '@/api'
import {notice } from '@/utils/notice'

interface userInfosState {
    userInfos: {
        name: string
        email: string
        avatar: string
        role: string
        id: string
       
    };
}

export const useUserInfo = defineStore('userInfo', {
    state: (): userInfosState => ({
        userInfos: {
            name: "",
            email: "",
            avatar: "",
            role: "",
            id: ''
        },
    }),
    actions :{
    // const routers =useRouter()
    async login(userInfo: { email: string, password: string }) {
        console.log("hahahah")
        const data = await login(userInfo) as any
        if (data != null) {
            if (data.code === -6) {
                notice('error', '登录失败', data.msg)
            } else if (data.code === -2) {
                notice('error', '登录失败', '邮箱不存在！')
            } else if (data.code === 0) {
                console.log("token",data.data)
                setToken(data.data)
                notice('success', '成功', '登录成功')
            } else {
                notice('error', '失败', '登录失败！')
            }
        }
    },
    async getUserInfo() {
        const data = await getUserInfo() as any
        if (data != null) {
            if (data.code === 0) {
                this.userInfos.id = data.data.id
                this.userInfos.email = data.data.email
                this.userInfos.name = data.data.name
                this.userInfos.role = data.data.role
                this.userInfos.avatar = data.data.avatar
            } else {
                notice('error', '错误', '获取用户信息错误!')
            }
        }
    },
    logout() {
        clear()
        this.userInfos.id = ''
        this.userInfos.email = ''
        this.userInfos.name = ''
        this.userInfos.role = ''
        clearRouter()
        router.push({ path: '/login' })

    }

},
    })



