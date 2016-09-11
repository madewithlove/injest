import renderer from 'react-test-renderer';

/**
 * Assert that a component equals X
 */
export default actual => {
    if (typeof actual.toJSON === 'undefined') {
        actual = renderer.create(actual);
    }

    const tree = actual.toJSON();
    expect(tree).toMatchSnapshot();

    return {actual, tree};
};
