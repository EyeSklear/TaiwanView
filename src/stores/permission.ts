import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
// import { useRouter } from "vue-router"
import { constantRoutes } from '@/router'
import { asyncRouters } from "@/router";
import { Ref, reactive,ref} from "vue";
interface permissionState{
    permission:{
        routs:RouteRecordRaw[];
        addRouts:RouteRecordRaw[];
        realrouts:[];
    }
}
export const usePermission = defineStore('permission', {

state :  ():permissionState=>({
    permission :{
        routs:constantRoutes ,
        addRouts:[] ,
    }
}),

actions :{
    set_routers( routers: RouteRecordRaw[]) {
        this.permission.addRouts = routers
        console.log("初始静态路由",this.permission.routs)
        this.permission.routs = constantRoutes.concat(routers)
        console.log("这里是总路由1",this.permission.routs)
    },
    generateRoutes(role: string){
        const result = filterAsyncRoutes(asyncRouters, role);
        console.log("这里是总路由",result)
        this.set_routers(result)
    },
    clearRouters(){
        this.set_routers([])
    }
}
// const filterAsyncRoutes = (asyncRouters: RouteRecordRaw[], role: string) => {
//     const result: RouteRecordRaw[] = [];
//     asyncRouters.forEach((item) => {
//       const r = { ...item };
//       if (hasPermission(r, role)) {
//         if (r.children) {
//           r.children = filterAsyncRoutes(r.children, role);
//         }
//         result.push(r);
//       }
//     });
//     return result;
//   };
// }
})

//使用递归来将符合当前用户权限的路由加入到总路由中，实现动态路由
const filterAsyncRoutes=(routers:RouteRecordRaw[],role:string) =>{
    console.log("hahasdad")
    const result:RouteRecordRaw[] =[]
    routers.forEach((item)=>{
        const r ={ ...item };
        if(hasPermission(r,role)){
            if(r.children){
                filterAsyncRoutes(r.children,role)
            }
            result.push(r)
        }
    })
    console.log(result)
    
    return result
}
//判断当前用户的权限是否可以访问当前路由
const hasPermission = function (router: RouteRecordRaw, role: string) {
    if (router.meta != undefined && router.meta.role != undefined) {
      for (let i = 0; i < (router.meta.role as string[]).length; i++) {
        if ((router.meta.role as string[])[i] === role) {
          return true;
        }
      }
      return false;
    } else {
      return true;
    }
  };
