import { Getters, Mutations, Actions, Module } from 'vuex';
import { RootState } from '../interface';
import {
    ArticleState,
    IGetters,
    IMutations,
    IActions
} from '@/store/articles/type';
import api from '@/plugins/api';

const state: ArticleState = {
    articles: []
};

const getters: Getters<ArticleState, IGetters> = {
    articles(state) {
        return state.articles;
    }
};

const mutations: Mutations<ArticleState, IMutations> = {
    allStateReset(state) {
        state.articles = [];
    },
    onAddArticles(state, payload) {
        state.articles.push(payload);
        console.log({ state });
    }
};

const actions: Actions<ArticleState, IActions, IGetters, IMutations> = {
    async postArticle(ctx, articles) {
        const response = await api.post('', {
            ...articles
        });

        ctx.commit('onAddArticles', response.data.articles);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};

export const articles: Module<ArticleState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
