<template>
    <article>
        <div id="articleForm" style="text-align: center; margin-top: 30px;">
            <p>
                <v-ons-input
                    placeholder="title"
                    float
                    v-model="title"
                ></v-ons-input>
            </p>
            <p>
                <v-ons-input
                    type="file"
                    placeholder="画像"
                    float
                    v-model="image"
                    accept="image/gif,image/jpeg,image/png,image/jpg"
                    @change="handleFile"
                >
                    <img :src="imageUrl" v-if="imageUrl !== ''" />
                </v-ons-input>
            </p>
            <p>
                <v-ons-input
                    placeholder="body"
                    float
                    v-model="body"
                ></v-ons-input>
            </p>
            <p>
                <v-ons-input
                    placeholder="タグ"
                    float
                    v-model="articleTag"
                ></v-ons-input>
            </p>
            <p style="margin-top: 30px;">
                <v-ons-button @click="submit">Submit</v-ons-button>
            </p>
        </div>
    </article>
</template>

<script lang="ts">
import * as Vuex from 'vuex';
import { Vue, Component } from 'vue-property-decorator';
// import api from '@/plugins/api';

const readImage = (file: File): Promise<string> => {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result as string);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    });
};

@Component
export default class ArtricleForm extends Vue {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    title: string = '';

    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    body: string = '';

    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    articleTag: string = '';

    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    image: string = '';

    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    imageUrl: string = '';

    $store!: Vuex.ExStore;

    $routeGetter!: Vuex.RootGetters;

    async handleFile(e: Event) {
        const file = (e.target as HTMLInputElement).files?.[0];

        if (file) {
            this.imageUrl = await readImage(file);
        }
    }

    submit() {
        this.$store.dispatch('postArticle', {
            id: '',
            title: this.title,
            shop: { id: '', name: '' },
            body: this.body,
            updateAt: '',
            articlTag: []
        });
        // console.log(`/${this.$routeGetter['articles/onAddArticles']}`);
        //     api.post(`/${this.$routeGetter['articles/onAddArticles']}`)
    }
}
</script>
<style scoped>
img {
    width: 200px;
}
</style>
