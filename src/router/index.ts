import { createRouter, createWebHistory, createWebHashHistory,RouteRecordRaw, asyncRouters } from 'vue-router'
import Layout from '../layout/index.vue'
import { shallowRef } from 'vue'
// import { useMyStore } from "@/stores/mystore"
import { useUserInfo } from "@/stores/userInfo"
import { usePermission } from "@/stores/permission"
import NProgress from "nprogress"; // 导入 nprogress模块
import "nprogress/nprogress.css"; // 导入样式，否则看不到效果

export const constantRoutes: Array<RouteRecordRaw> = [
    {
        //路由初始指向
        path: '/',
        name: '/',
        component: Layout,
        children: [
            {
                path: '',
                name: 'Home',
                component:() => import('@/views/Home.vue'),
                meta: {
                    keepAlive: false,
                    title: '首页'
                }

            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login/index.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/register/index.vue'),
        meta: {
            title: '注册'
        }
    },
    {
        path: '/404',
        name: "404",
        component: () => import('@/views/404/Index.vue'),
        meta: {
            title: '404'
        }
    }
    // {
    //     path: '/404',
    //     name: "404",
    //     component: () => import('@/views/404/Index.vue'),
    //     meta: {
    //         title: '404'
    //     }
    // },
    // {
    //     path: '/data',
    //     name: "data",
    //     component: () => import('@/components/DataList.vue'),
    //     meta: {
    //         title: '插槽'
    //     }
    // },
    // {
    //     path: '/dataCard',
    //     name: "dataCard",
    //     component: () => import('@/components/cards/DataCard.vue'),
    //     meta: {
    //         title: '组件'
    //     }
    // },
    // {
    //     path: "/data",
    //     name: 'Data',
    //     //component: shallowRef(Layout),
    //     redirect: '/data/list',
    //     children: [
    //         {
    //             path: '/list',
    //             name: 'DataList',
    //             component: () => import('@/components/dataList.vue'),
    //             meta: {
    //                 keepAlive: true,
    //                 title: '资源门户',
    //                 key: "DataList",
    //             }
    //         },
    //     ]
    // }

]

export const asyncRouters: Array<RouteRecordRaw> = [
    // {
    //     path: "/data",
    //     name: 'Data',
    //     component: shallowRef(Layout),
    //     redirect: '/data/list',
    //     children: [
    //         {
    //             path: '/list',
    //             name: 'DataList',
    //             component: () => import('@/components/dataList.vue'),
    //             meta: {
    //                 keepAlive: true,
    //                 title: '资源门户',
    //                 key: "DataList",
    //             }
    //         },
    //     ]
    // }
    // {
    //     path: '/slot',
    //     name: "data",
    //     component: () => import('@/components/DataList.vue'),
    //     meta: {
    //         role:["member","admin"],
    //         title: '插槽',
            
    //     }
    // },
    {
        path: "/data",
        name: 'Data',
        component: Layout,
        redirect: '/data/list',
        children: [
            {
                path: 'list',
                name: 'DataList',
                component: () => import('@/components/DataList.vue'),
                meta: {
                    role:["member","admin"],
                    keepAlive: false,
                    title: '资源门户',
                    key: "DataList",
                }
            },
        ]
    },
    {
        path: '/mapview',
        name: "Mapview",
        component: () => import('@/components/Mapview.vue'),
             meta: {
                role:["member","admin"],
                keepAlive: false,
                title: '全景台湾一张图',
                key: "MapView",
             }
    },
    {
        path: "/:catchAll(.*)",
        name: 'Redirect404',
        redirect: '/404'
    }
]
//      path: "/data",
//      name: 'Data',
//      component: shallowRef(Layout),
//      children: [
//          {
//              path: '',
//              redirect: '/data/list'
//          },
//          {
//              path: 'list',
//              name: 'List',
//              component: () => import('@/views/data/Index.vue'),
//              meta: {
//                  keepAlive: true,
//                  title: '资源门户'
//              }
//          },
//      ]
//  },
//  {
//   path: "/mapview",
//   name: 'mapview',
//   component: import('@/components/mapView.vue'),
//   meta: {
//     keepAlive: true,
//     title: '资源门户'
// },
// },
// ]

const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                top: 0
            }
        }
    }
})

// if (to.path !== '/Home' && to.path !== '/') {
//   const store = useStore()
//   if (store.routes.length < 1) {

//       GetDynamicRoutes().then(res => {
//           store.addRoutes(res.data.data, router)
//           next({ path: to.path, replace: true })

//       }).catch(_ => {
//           next()
//       })

//   } else {
//       next()
//   }
// } else {
//   next()
// }

export function resetRouter() {
    const newRouter = createRouter({
        history: createWebHashHistory(),
        routes: constantRoutes,
    });
    const tempList: any[] = []
    router.getRoutes().forEach(item => {
        for (let i = 0; i < newRouter.getRoutes().length; i++) {
            if (item.name === newRouter.getRoutes()[i].name) {
                return
            }
        }
        tempList.push(item.name)
    })
    tempList.forEach(item => {
        router.removeRoute(item)
    })

}
//路由守卫

export default router
