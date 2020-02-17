import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

// firebase
import firebase from '@/plugins/firebase';

// OnsenUI
import VueOnsen from 'vue-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

Vue.use(VueOnsen);
Vue.config.productionTip = false;

firebase.app.init();

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
