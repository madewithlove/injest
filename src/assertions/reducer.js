import {fromJS} from 'immutable';

/**
 * Assert that a reducer equals X
 */
export default (actual, before, action = {}, after) => {
    before = fromJS(before);
    const result = actual(before, action);

    // If we specified a result to test against
    // use that instead of a snapshot
    if (after) {
        return expect(result.toJS()).toEqual(after);
    }

    return expect(result).toMatchSnapshot();
};
