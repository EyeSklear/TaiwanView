import router from "@/router/index";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { RouteLocationNormalized, RouteRecordRaw } from "vue-router";
import { useUserInfo } from "@/stores/userInfo"
import { usePermission } from "@/stores/permission"
import { getToken } from "@/utils/auth";
import { storeToRefs } from 'pinia';
// import { toIdPages } from "@/utils/routerUtil";


let userInfoStore: any = null;
let permissionStore: any = null;

// const userInfoStore = useUserInfo();
// const permissionStore = usePermission();

router.beforeEach(

    async (to, from, next) => {
        const userInfoStore = useUserInfo();
        const permissionStore = usePermission();
        console.log("items", router.options.routes)
        NProgress.start();
        // if (userInfoStore === null) {
        //     userInfoStore = useUserInfo()
        //   } 
        //   if (permissionStore === null) {
        //     permissionStore = usePermission()
        //   } 

        //如果用户曾经登陆过，或者已经登陆过（拥有token）
        if (getToken() != null) {
            if (to.path === "/login" || to.path === "/register") {
                window.document.title = "首页";
                next({ path: "/" });
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
                        const { permission } = storeToRefs(permissionStore);
                        permissionStore.permission.addRouts.forEach((item as RouteRecordRaw) => {
                            router.addRoute(item);
                        })
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
                    console.log(userInfoStore)
                    // const code = await toIdPages(to);
                    // if (code === 1) {
                    //   window.document.title = to.meta.title as string;
                    window.document.title = to.meta.title as string;
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
            if (to.path === "/login" || to.path === "/register" || to.path === "/") {
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