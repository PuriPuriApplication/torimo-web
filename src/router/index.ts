import Vue from 'vue';
import { Route } from 'vue-router';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import firebase from 'firebase';
import Test from '@/views/Test.vue';
import Cookie from 'js-cookie';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/test',
        name: 'Test',
        beforeEnter(to: Route, from: Route, next: Function): void {
            const user = firebase.auth().currentUser;
            const token = Cookie.get('idToken');
            const accessToken = Cookie.get('accessToken');
            const secretKey = Cookie.get('secretKey');
            if (user && token && accessToken && secretKey) {
                next();
            } else {
                Cookie.set('redirect', to.fullPath);
                next('/login');
            }
        },
        component: Test
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/detail/:id',
        name: 'Detail',
        component: () => import('../views/Detail.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
