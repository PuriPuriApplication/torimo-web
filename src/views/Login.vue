<template>
    <ons-page class="login">
        <ons-modal v-show="show">
            <div id="modal-login">
                <h2>Welcome Torimo</h2>
                <img src="/img/twitter.png" @click="submit" />
            </div>
        </ons-modal>
    </ons-page>
</template>

<script>
import firebase from 'firebase';
import Cookie from 'js-cookie';
import cookie from '@/plugins/cookie';

export default {
    name: 'Login',
    async beforeCreate() {
        let isLogined = false;
        try {
            const result = await firebase.auth().getRedirectResult();
            if (result.credential) {
                const accessToken = result.credential.accessToken;
                const secret = result.credential.secret;
                const user = result.user;
                const idToken = await firebase
                    .auth()
                    .currentUser.getIdToken(/* forceRefresh */ true);
                if (!(accessToken && secret && user && idToken)) {
                    throw new Error('login failed');
                }
                await this.$store.dispatch('auth/saveUser', {
                    uid: user.uid,
                    name: user.displayName,
                    iconPath: user.photoURL,
                    mailAddress: user.email,
                    phoneNumber: user.phoneNumber,
                    idToken: idToken,
                    accessToken: accessToken,
                    secretKey: secret
                });
                isLogined = true;
            }
        } catch (error) {
            console.error(error);
        }
        if (isLogined) {
            const path = Cookie.get(cookie.redirect);
            if (path) {
                Cookie.get(cookie.redirect, undefined);
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
#modal-login {
    background-color: #ffffff;
    width: 50%;
    color: #ffb6c1;
    border-radius: 10px;
    border: solid 1px #ffb6c1;
    margin: calc((100% - 50%) / 2);
}

img {
    width: 200px;
}
</style>
