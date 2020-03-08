<template>
    <article>
        <div class="detail_item__title">
            <div>
                <h2>{{ detail.title }}</h2>
            </div>
            <div>
                <v-ons-fab class="detail_item__like" @click="postArticleLike">
                    <i v-if="isLike" class="fas fa-heart"></i>
                    <i v-else-if="!isLike" class="far fa-heart"></i>
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
        <v-ons-bottom-toolbar class="detail_item__fotter">
            <div class="detail_item__fotter_content">
                <div style="display: flex;">
                    <v-ons-fab>
                        <v-ons-icon icon="md-face"></v-ons-icon>
                    </v-ons-fab>
                    <ul class="detail_item__user">
                        <li class="detail_item__user_name">
                            {{ user.name }}
                        </li>
                        <li>フォロワー：{{ followersCount }}</li>
                    </ul>
                </div>
                <div>
                    <v-ons-button v-if="isFollow">フォロー中</v-ons-button>
                    <v-ons-button v-else modifier="outline"
                        >フォローする</v-ons-button
                    >
                </div>
            </div>
        </v-ons-bottom-toolbar>
    </article>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import axios from 'axios';
import { Model } from '@/types/model';
import { ArticleLike, ArticleDetail, LikeAndFollowers } from '@/entity/article';

@Component
export default class Detail extends Vue {
    private detail: ArticleDetail = {
        id: 0,
        title: '',
        body: '',
        createAt: '',
        user: {
            id: 0,
            name: '',
            externalServiceId: 0,
            externalServiceType: ''
        },
        shop: { id: 0, name: '' },
        categories: [{ id: 0, name: '' }]
    };

    private user: Model = { id: 0, name: '' };

    private shop: Model = { id: 0, name: '' };

    private followersCount = 0;

    private isLike = false;

    private isFollow = false;

    created() {
        this.getDetail();
        console.log(this.isLike);
    }

    async getDetail() {
        const { data: detail } = await axios.get<ArticleDetail>(
            `${process.env.VUE_APP_API_BASE_URL}/articles/${this.$route.params['id']}`
        );
        this.detail = detail;
        this.shop = detail.shop;
        this.user = detail.user;

        const { data: count } = await axios.get(
            `${process.env.VUE_APP_API_BASE_URL}/followUser/followerCount/${detail.user.id}`
        );
        this.followersCount = count;

        const { data: likeAndFollows } = await axios.get<LikeAndFollowers>(
            `${process.env.VUE_APP_API_BASE_URL}/articles/${this.$route.params['id']}/like-and-follow`
        );
        this.checkLikeAndFollow(likeAndFollows);
    }

    checkLikeAndFollow(likeAndFollows: LikeAndFollowers) {
        if (likeAndFollows.articleLikes.includes(this.user.id)) {
            this.isLike = true;
        }
        likeAndFollows.followUsers.forEach(followUser => {
            if (followUser.fromUser === this.user.id) {
                this.isFollow === true;
                return;
            }
        });
    }

    // TODO: いいね機能の実装。プルリク分けます。
    postArticleLike() {
        const articleLike: ArticleLike = {
            articleId: this.detail.id,
            userId: this.user.id
        };
        axios
            .post(
                `${process.env.VUE_APP_API_BASE_URL}/article-like/like`,
                articleLike
            )
            .then(() => {
                console.log('OK');
                this.isLike === true;
                console.log('isLike', this.isLike);
                // TODO: 再レンダリングされてない？
            })
            .catch(() => {
                console.log('NG');
                this.isLike === false;
            }); // TODO: エラーメッセージ表示
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
    height: 70px;
}
.detail_item__fotter_content {
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
.detail_item__user_name {
    font-size: 18px;
    font-weight: bold;
}
</style>
