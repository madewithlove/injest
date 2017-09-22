export function assert(result: any, expected?: any) {
    result = result && result.toJS ? result.toJS() : result;

    if (typeof expected !== 'undefined') {
        expect(result).toEqual(expected);
    } else {
        expect(result).toMatchSnapshot();
    }
}

export default function describeAssertion(
    description: string,
    result: any,
    expected?: any,
) {
    it(description, () => {
        assert(result, expected);
    });
}
