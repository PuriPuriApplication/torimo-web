import { AnimationOptions } from './animation.options';

export interface NavigatorOptions {
    animation?:
        | 'none'
        | 'default'
        | 'slide-ios'
        | 'slide-md'
        | 'lift-ios'
        | 'lift-md'
        | 'fade-ios'
        | 'fade-md'
        | string;

    animationOptions?: AnimationOptions;

    callback?: Function;
}
