<template>
    <div>
        <v-ons-toolbar>
            <div class="center">
                TORIMO
            </div>
        </v-ons-toolbar>
        <div id="app">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';

@Component({
    components: {
        HelloWorld
    }
})
export default class App extends Vue {}
</script>

<style scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-width: 500px;
    max-width: 900px;
    margin: 40px auto;
    padding: 0px 20px;
}
</style>
