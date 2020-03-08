import { Model } from '@/types/model';

export type ArticleLike = {
    articleId: number;
    userId: number;
};

export type ArticleDetail = {
    id: number;
    title: string;
    body: string;
    createAt: string;
    user: Model & {
        externalServiceId: number;
        externalServiceType: string;
    };
    shop: Model;
    categories: Model[];
};

export type LikeAndFollowers = {
    articleLikes: number[];
    followUsers: FollowUser[];
};

export type FollowUser = {
    fromUser: number;
    toUser: number;
};
