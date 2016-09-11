/**
 * Assert that a component equals X
 */
export default component = actual => {
    if (typeof actual.toJSON === 'undefined') {
        actual = renderer.create(actual);
    }

    expect(actual.toJSON()).toMatchSnapshot();
}