declare type ExPartial<T> = { [P in keyof T]?: Partial<T[P]> | undefined };
