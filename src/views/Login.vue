<template>
    <div class="login" v-show="show">
        <h2>Welcome Torimo</h2>
        <img src="/img/twitter.png" @click="submit" />
    </div>
</template>

<script>
import firebase from 'firebase';
import Cookie from 'js-cookie';

export default {
    name: 'Login',
    async beforeCreate() {
        let isLogined = false;
        try {
            const result = await firebase.auth().getRedirectResult();
            if (result.credential) {
                const token = result.credential.accessToken;
                const secret = result.credential.secret;
                const user = result.user;
                if (!token || !secret || !user) {
                    throw new Error('login failed');
                }
                Cookie.set('token', token, { expires: 1 / 24 });
                Cookie.set('secret', token, { expires: 1 / 24 });

                this.$store.commit('auth/setUser', user);
                isLogined = true;
            }
        } catch (error) {
            console.error(error);
        }
        if (isLogined) {
            const path = Cookie.get('redirect');
            if (path !== 'undefined') {
                Cookie.get('redirect', undefined);
                this.$router.push(path);
            } else {
                this.$router.push('/home');
            }
        } else {
            this.show = true;
        }
    },
    methods: {
        submit() {
            const provider = new firebase.auth.TwitterAuthProvider();
            firebase.auth().languageCode = 'ja';
            firebase.auth().signInWithRedirect(provider);
        }
    },
    data() {
        return {
            show: false
        };
    }
};
</script>
<style scoped>
img {
    width: 200px;
}
</style>
