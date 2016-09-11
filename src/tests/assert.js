import {assert} from '../assertions';

/**
 * Test and snapshot something
 */
export default (description, ...args) => {
    test(description, () => {
        assert(...args);
    });
};
