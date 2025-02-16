import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import WelcomePage from '../components/Welcome.vue';
import StudentSearchPage from '../views/student/StudentSearch.vue';
import StudentAddPage from "../views/student/StudentAddPage.vue";
import StudentDeletePage from "../views/student/StudentDeletePage.vue";
import StudentListPage from '../views/student/StudentListPage.vue';
import Home from "../Home.vue";
import StudentUpdatePage from "../views/student/StudentUpdatePage.vue";

const routes = [
    { path: '/', component: LoginPage, meta: { noLayout: true } },
    { path: '/home', component: Home},
    { path: '/welcome', component: WelcomePage},
    { path: '/student/search', component: StudentSearchPage },
    { path: '/student/add', component: StudentAddPage },
    { path: '/student/update', component: StudentUpdatePage },
    { path: '/student/delete', component: StudentDeletePage },
    { path: '/student/list', component: StudentListPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// 全局路由守卫：如果未登录，则跳转到 LoginPage
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token'); // 这里用 token 判断用户是否已登录
    if (to.path !== '/' && !isAuthenticated) {
        next('/'); // 未登录时跳转到 LoginPage
    } else {
        next(); // 放行
    }
});

export default router;