import { Model } from '@/types/model';

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
