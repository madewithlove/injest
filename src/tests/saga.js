import {saga as assert} from '../assertions';

/**
 * Test and snapshot a saga
 */
export default (description, ...args) => {
    test(description, () => {
        assert(...args);
    });
};
