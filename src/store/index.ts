import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { auth } from './auth';
import articles from './articles';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        version: '1.0.0',
        articles: { articles: [] }
    },
    mutations: {},
    actions: {
        postArticle: articles.actions.postArticle as any
    },
    modules: {
        auth,
        articles
    },
    plugins: [
        createPersistedState({
            key: 'torimo-web',
            storage: window.sessionStorage
        })
    ]
});
