import {component as assert} from '../assertions';

/**
 * Test and snapshot a component
 */
export default component = (description, ...args) => {
    return test(description, () => assert(...args));
};
