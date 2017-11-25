import { fromJS } from "immutable";
import assert from "./assert";

/**
 * Assert that a reducer equals X
 */
export default (actual, before, action = {}, after) => {
    before = fromJS(before);
    const result = actual(before, action);

    return assert(result.toJS(), after);
};
