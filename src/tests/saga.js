import {saga as snap} from '../snapshots';

/**
 * Test and snapshot a saga
 */
export default saga = (description, ...args) => {
    return test(description, () => snap(...args));
};