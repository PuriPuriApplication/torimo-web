<template>
    <article>
        <h2>{{ detail.title }}</h2>
        <button
            v-for="category in detail.categories"
            :key="category.id"
            class="toolbar-button toolbar-button--outline"
        >
            {{ category.name }}
        </button>
        <div>
            <div class="card article_item">
                <div class="card__content" v-text="detail.body"></div>
                <div class="article_item__creat_at">{{ detail.createAt }}</div>
            </div>
        </div>
        <div class="article_item">
            <span>{{ user.name }}</span>
            &nbsp;さん&nbsp;
            <button class="button">フォローする</button>
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
            .get(`http://localhost:8080/articles/${this.$route.params['id']}`) // TODO: Base URL
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
