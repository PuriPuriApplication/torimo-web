<template>
    <div class="auth"></div>
</template>

<script>
import firebase from 'firebase';
import Cookie from 'js-cookie';

export default {
    name: 'Auth',
    mounted() {
        firebase.auth().onAuthStateChanged(async user => {
            if (user) {
                let path = '/home';
                if (this.$route.query.redirect) {
                    path = this.$route.query.redirect;
                } else if (Cookie.get('redirect')) {
                    path = Cookie.get('redirect');
                }
                console.log('Login Success!' + path);
                await this.$router.push(path);
            } else {
                Cookie.set('redirect', this.$route.query.redirect);
                this.$router.push('/login');
            }
        });
    }
};
</script>
