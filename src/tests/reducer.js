import {reducer as assert} from '../assertions';

/**
 * Test and snapshot a reducer
 */
export default (description, ...args) => {
    test(description, () => {
        assert(...args);
    });
};

/**
 * Prepare a function to test and snapshot a reducer
 */
export const reducerTestFactory = tested => {
    return (description, ...args) => {
        // If we have multiple things to test and received a callback
        // pass the wrapped snapshot function to it
        if (typeof args[0] === 'function') {
            const asserter = (...assertionArgs) => assert(tested, ...assertionArgs);
            test(description, () => args[0](asserter));

            return;
        }

        test(description, () => assert(tested, ...args));
    };
};
