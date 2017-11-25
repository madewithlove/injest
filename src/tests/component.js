import { component as assert } from "../assertions";

/**
 * Test and snapshot a component
 */
export default (description, ...args) => {
    test(description, () => {
        assert(...args);
    });
};
