import router from "@/router/index";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { RouteLocationNormalized } from "vue-router";
import { useUserInfo } from "@/stores/userInfo"
import { usePermission } from "@/stores/permission"
import { getToken } from "@/utils/auth";
import { storeToRefs } from 'pinia';
// import { toIdPages } from "@/utils/routerUtil";


const whiteList = ['/login', '/register']
let userInfoStore :any =null;
let permissionStore :any= null;

// const userInfoStore = useUserInfo();
// const permissionStore = usePermission();

router.beforeEach(

    async (to, from, next) => {
        const userInfoStore = useUserInfo();
        const permissionStore = usePermission();
        NProgress.start();
        // if (userInfoStore === null) {
        //     userInfoStore = useUserInfo()
        //   } 
        //   if (permissionStore === null) {
        //     permissionStore = usePermission()
        //   } 
        
        //如果用户曾经登陆过，或者已经登陆过（拥有token）
        if (getToken() != null) {
            if (whiteList.includes(to.path)) {
                window.document.title = "首页";
                next({ path: "/" });
                // console.log("wokaka")
                NProgress.done();
            }
            else {
                // console.log("what",userInfoStore.userInfos.role)
                // console.log("what2",userInfoStore)
                if (userInfoStore.userInfos.role === "") {
                    // console.log("what3",userInfoStore.userInfos.role)
                    try {
                        await userInfoStore.getUserInfo()
                        const role = userInfoStore.userInfos.role
                        permissionStore.generateRoutes(role)
                         const {permission}= storeToRefs(permissionStore);
                        // console.log("permissionStore",permission.value)
                        permissionStore.permission.addRouts.forEach((item) => {
                            router.addRoute(item);
                            // console.log("item",item)
                        })
                        // console.log("WOWOW",router)
                        window.document.title = to.meta.title as string;
                        next({ ...to, replace: true });
                        NProgress.done();
                    } catch (err) {
                        userInfoStore.logout();
                        window.document.title = "登录";
                        next("/login")
                        NProgress.done();
                    }

                }
                else {
                    console.log("gagag")
                    // const code = await toIdPages(to);
                    // if (code === 1) {
                    //   window.document.title = to.meta.title as string;
                       next();
                    // } else if (code === -1) {
                    //   window.document.title = "404";
                    //   next("/404");
                    // } else if (code === 0) {
                    //   window.document.title = to.meta.title as string;
                    //   next();
                    // }
                     NProgress.done();
                }
            }
        } else {
            if (whiteList.includes(to.path) || to.path === "/") {
                window.document.title = to.meta.title as string;
                next();
                NProgress.done();
            } else {
                window.document.title = '登录';
                next("/login");
                NProgress.done();
            }

        }
        NProgress.done();
    }

)