<template>
    <div>
        <div class="toolbar">
            <div class="toolbar__center">TORIMO</div>
        </div>
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

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 20px 40px;
}
</style>
