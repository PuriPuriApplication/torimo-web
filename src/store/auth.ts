import { AuthState, RootState } from './interface';
import { Module } from 'vuex';

export const auth: Module<AuthState, RootState> = {
    namespaced: true,
    state: {
        user: undefined
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    }
};
