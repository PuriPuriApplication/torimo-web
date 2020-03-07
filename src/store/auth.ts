import { AuthState, RootState } from './interface';
import { Module } from 'vuex';
import Cookie from 'js-cookie';
import User from '@/entity/user';
import axios from 'axios';

export const auth: Module<AuthState, RootState> = {
    namespaced: true,
    state: {
        user: undefined
    },
    actions: {
        async saveUser(
            { commit },
            {
                uid,
                name,
                iconPath,
                mailAddress,
                phoneNumber,
                idToken,
                accessToken,
                secretKey
            }
        ) {
            Cookie.set('idToken', idToken, { expires: 1 / 24 });
            Cookie.set('accessToken', accessToken, { expires: 1 / 24 });
            Cookie.set('secretKey', secretKey, { expires: 1 / 24 });
            const user: User = {
                uid,
                name,
                iconPath,
                mailAddress,
                phoneNumber
            };
            commit('setUser', user);
            const registData = {
                name: name,
                externalServiceId: uid,
                externalServiceType: 'TWITTER'
            };
            await axios.post(
                `${process.env.VUE_APP_API_BASE_URL}/user/create`,
                registData
            );
        }
    },
    mutations: {
        setUser(state, user): void {
            state.user = user;
        }
    }
};
