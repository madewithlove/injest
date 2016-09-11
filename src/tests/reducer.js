import {reducer as snap} from '../snapshots';

/**
 * Test and snapshot a reducer
 */
export default reducer = (description, ...args) => {
    return test(description, () => snap(...args));
};

/**
 * Prepare a function to test and snapshot a reducer
 */
export const reducerTestFactory = tested => {
    return (description, ...args) => {
        // If we have multiple things to test and received a callback
        // pass the wrapped snapshot function to it
        if (typeof args[0] === 'function') {
            const snapper = (...snapArguments) => snap(tested, ...snapArguments);
            return test(description, () => args[0](snapper));
        }

        return test(description, () => snap(tested, ...args));
    }
};