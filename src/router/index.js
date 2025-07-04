import { createWebHistory, createRouter } from "vue-router";

//配置路由映射规则
const routes = [
    {   name: "Layout",
        path: "/",
        component: ()=>import("@/components/Layout/index.vue"), //路由懒加载
        redirect: "/home",
        children:[
            {
            name: "Home",
            path: "/home",
            component: () => import("@/views/index.vue")
            },
            {
                name: "Archive",
                path: "/archive",
                component: () => import("@/views/archive/index.vue")
            },
            {
                name: "article",
                path: "/article",
                component: () => import("@/views/article/index.vue")
            },
            {
                name: "Talk",
                path: "/talk",
                component: () => import("@/views/talk/index.vue")
            },
            {
                name: "More",
                path: "/more",
                children:[{
                    name: "About",
                    path: "/about",
                    component: () => import("@/views/more/about/index.vue")
                }]
            }
        ]
    } 
];
//路由实例通过createRouter创建
const router = createRouter({
    // hash/history
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { top: 0 };
    },
});

export default router; //导出，用于main.js注册`