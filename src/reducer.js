export default function reducer(description, tested, state, action, expected) {
    if (typeof action === 'function') {
        it(description, () => {
            action((...args) => {
                expect(tested(state, ...args)).toMatchSnapshot();
            });
        });
    }

    it(description, () => {
        const result = tested(state, action);

        if (typeof expected !== 'undefined') {
            expect(result).toEqual(expected);
        } else {
            expect(result).toMatchSnapshot();
        }
    });
}
