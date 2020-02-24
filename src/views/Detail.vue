<template>
    <article>
        <div class="detail_item__title">
            <div>
                <h2>{{ detail.title }}</h2>
            </div>
            <div>
                <v-ons-fab class="detail_item__like">
                    <i class="far fa-heart"></i>
                    <!-- TODO: v-if でいいねしたらこっちのアイコン -->
                    <!-- <i class="fas fa-heart"></i> -->
                </v-ons-fab>
            </div>
        </div>

        <h3 class="detail_item__shop">{{ shop.name }}</h3>

        <v-ons-button v-for="category in detail.categories" :key="category.id">
            {{ category.name }}
        </v-ons-button>
        <div>
            <v-ons-card class="detail_item">
                <div class="content" v-text="detail.body"></div>
                <div class="detail_item__creat_at">
                    投稿日：{{ detail.createAt }}
                </div>
            </v-ons-card>
        </div>
        <v-ons-bottom-toolbar style="height: 70px;">
            <div class="detail_item__fotter">
                <div style="display: flex;">
                    <v-ons-fab>
                        <v-ons-icon icon="md-face"></v-ons-icon>
                    </v-ons-fab>
                    <ul class="detail_item__user">
                        <li>{{ user.name + ' さん' }}</li>
                        <!-- TODO: フォロワーをAPIから取ってくる -->
                        <li>フォロワー：100</li>
                    </ul>
                </div>
                <div>
                    <v-ons-button modifier="outline">フォローする</v-ons-button>
                    <!-- TODO: フォローしたらこっちのアイコン -->
                    <!-- <v-ons-button>フォロー中</v-ons-button> -->
                </div>
            </div>
        </v-ons-bottom-toolbar>
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

    private shop = {};

    created() {
        return axios
            .get(
                `${process.env.VUE_APP_API_BASE_URL}/articles/${this.$route.params['id']}`
            )
            .then(res => {
                this.detail = res.data;
                this.user = res.data.user;
                this.shop = res.data.shop;
            });
    }
}
</script>

<style scoped>
.detail_item__title {
    display: flex;
    justify-content: space-between;
}
.detail_item__shop {
    margin-top: 5px;
}
.detail_item__like {
    margin-top: 15px;
}
.detail_item {
    margin-top: 25px;
}

.detail_item__creat_at {
    text-align: right;
}

.detail_item__fotter {
    display: flex;
    justify-content: space-between;
    margin: 10px 10px;
    min-width: 500px;
    max-width: 500px;
    margin: 8px auto;
    padding: 0px 20px;
}

.detail_item__user {
    list-style: none;
    margin: 0px;
    padding-left: 15px;
}
</style>
