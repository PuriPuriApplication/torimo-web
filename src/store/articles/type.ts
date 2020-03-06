import { ModuleRootMutations } from '../type';

export interface Articles {
    id: string;
    title: string;
    user?: User;
    body: string;
    updateAt: string;
    shop: Shop;
    articlTag: ArticleTag[];
    imageId?: number;
    imageLink?: string;
}

export interface User {
    id: string;
    name: string;
    extarnalServiceId: string;
    extarnalServiceType: string;
}

interface Shop {
    id: string;
    name: string;
}

interface ArticleTag {
    id: string;
    name: string;
}

export interface ArticleState {
    articles: Articles[];
}

export interface IGetters {
    articles: Articles[];
}

export interface IRootGetters {
    postArticle: IGetters['articles'];
}

export interface IMutations extends ModuleRootMutations {
    onAddArticles: Articles;
}

export interface IRootMutations {
    'articles/onAddArticles': IMutations['onAddArticles'];
}

export interface IActions {
    postArticle: Articles;
}
