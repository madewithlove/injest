import renderer from 'react-test-renderer';

/**
 * Assert that a component equals X
 */
export default component => {
    if (typeof component.toJSON === 'undefined') {
        component = renderer.create(component);
    }

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    return {component, tree};
}