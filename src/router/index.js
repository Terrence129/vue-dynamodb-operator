import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/LoginPage.vue';
import StudentPage from '../components/StudentManagePage.vue';
import StudentListPage from '../components/StudentListPage.vue';

const routes = [
    { path: '/', component: LoginPage },
    { path: '/students', component: StudentPage },
    { path: '/students/list', component: StudentListPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;