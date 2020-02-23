import User from '@/entity/user';

export interface RootState {
    version: string;
}

export interface AuthState {
    user?: User;
}
