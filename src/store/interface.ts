import User from '@/entity/user';
import { ArticleState } from './articles/type';

export interface RootState {
    version: string;
    articles: ArticleState;
}

export interface AuthState {
    user?: User;
}
