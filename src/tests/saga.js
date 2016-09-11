import {saga as assert} from '../assertions';

/**
 * Test and snapshot a saga
 */
export default saga = (description, ...args) => {
    return test(description, () => assert(...args));
};