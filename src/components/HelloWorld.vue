<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <v-ons-carousel
            :index.sync="carouselIndex"
            fullscreen
            swipeable
            auto-scroll
            overscrollable
        >
            <v-ons-carousel-item v-for="(url, i) in items" :key="i">
                <img class="cat-image" :src="url" />
            </v-ons-carousel-item>
        </v-ons-carousel>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

// Sample OnsenUI Component.
@Component
export default class HelloWorld extends Vue {
    @Prop()
    private msg!: string;

    private carouselIndex = 0;

    private readonly items = [
        'http://placekitten.com/g/300/300',
        'http://placekitten.com/g/400/400',
        'http://placekitten.com/g/500/500'
    ];
}
</script>

<style scoped>
.cat-image {
    height: 60vh;
    width: 60vw;
}
</style>
