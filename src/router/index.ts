import Vue from 'vue';
import { Route } from 'vue-router';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import firebase from 'firebase';
import Test from '../views/Test.vue';
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
        async beforeEnter(
            to: Route,
            from: Route,
            next: Function
        ): Promise<void> {
            await firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    next();
                } else {
                    Cookie.set('redirect', to.fullPath);
                    next('/login');
                }
            });
        },
        component: Test
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
