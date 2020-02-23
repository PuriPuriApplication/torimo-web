import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { auth } from './auth';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        version: '1.0.0'
    },
    mutations: {},
    actions: {},
    modules: {
        auth
    },
    plugins: [
        createPersistedState({
            key: 'torimo-web',
            storage: window.sessionStorage
        })
    ]
});
