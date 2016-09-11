import {component as snap} from '../snapshots';

/**
 * Test and snapshot a component
 */
export default component = (description, ...args) => {
    return test(description, () => snap(...args));
};
