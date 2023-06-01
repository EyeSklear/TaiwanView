import { resetRouter } from "@/router"
import { usePermission } from "@/stores/permission"

//从localStorage中获得token
export function getToken(): string | null {
    return localStorage.getItem("fgztoken")
}
//在localStorage设置token
export function setToken(token: string): void {
    localStorage.setItem("fgztoken", token)
}
//清空localStorage
export function clear(): void {
    localStorage.clear()
}

//清空路由
export function clearRouter() {
    const usePermissionStore = usePermission()
    usePermissionStore.clearRouters(undefined)
    resetRouter()
}

export function decrypt(ciphertext: string, userId: string) {
    let result = ""
    const key = "abcdef0123456789".split('')
    for(let i = 0;i < ciphertext.length; i = i + 2) {
        const a = key.findIndex(item => {
            return item === ciphertext[i]
        })
        const b = key.findIndex(item => {
            return item === ciphertext[i + 1]
        })
        result += String.fromCharCode(16 * b + a - userId.charCodeAt(i / 2))
    }
    return result
    
}

