export type WrappedHelper<A extends Function> = A & {
    concurrent: WrappedHelper<A>;
    only: WrappedHelper<A>;
    skip: WrappedHelper<A>;
};

export type JestOptions = {
    concurrent?: boolean;
    only?: boolean;
    skip?: boolean;
};

export default function withJestOptions<A extends Function>(helper: A) {
    const proxy = new Proxy(helper, {
        get(target, key) {
            return (...args) => target(...args, it[key]);
        },
    });

    return proxy as WrappedHelper<A>;
}
