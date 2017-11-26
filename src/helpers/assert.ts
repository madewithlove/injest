export type PossiblyWrappedObject = { toJS?: () => object };

export function unwrap(object: PossiblyWrappedObject) {
    return object && object.toJS ? object.toJS() : object;
}

export function assert(result: any, expected?: any) {
    if (typeof expected !== "undefined") {
        expect(unwrap(result)).toEqual(unwrap(expected));
    } else {
        expect(result).toMatchSnapshot();
    }
}

export function describeAssertion(
    description: string,
    result: any,
    expected?: any,
) {
    it(description, () => {
        assert(result, expected);
    });
}
