<template>
    <article>
        <h2>{{ detail.title }}</h2>
        <v-ons-button
            v-for="category in detail.categories"
            :key="category.id"
            modifier="outline"
        >
            {{ category.name }}
        </v-ons-button>
        <div>
            <v-ons-card class="article_item">
                <div class="content" v-text="detail.body"></div>
                <div class="article_item__creat_at">{{ detail.createAt }}</div>
            </v-ons-card>
        </div>
        <div class="article_item">
            <span>{{ user.name }}</span>
            &nbsp;さん&nbsp;
            <v-ons-button>フォローする</v-ons-button>
        </div>
    </article>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class Detail extends Vue {
    private message = 'hogehoge';

    private detail = {};

    private user = {};

    created() {
        return axios
            .get(
                `${process.env.VUE_APP_API_BASE_URL}/articles/${this.$route.params['id']}`
            )
            .then(res => {
                this.detail = res.data;
                this.user = res.data.user;
            });
    }
}
</script>

<style scoped>
.article_item {
    margin-top: 25px;
}

.article_item__creat_at {
    text-align: right;
}
</style>
