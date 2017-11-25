export default (input, expected) => {
    // If we specified a result to test against
    // use that instead of a snapshot
    if (typeof expected !== "undefined") {
        expect(input).toEqual(expected);

        return;
    }

    expect(input).toMatchSnapshot();
};
