/**
 * Assert that a saga equals X
 */
export default (actual, effects) => {
    let result;

    // If we provided specific results to test against
    // use those instead of a snapshot
    if (typeof effects !== 'undefined') {
        let next = actual.next();

        return effects.forEach(effect => {
            expect(next.value).toEqual(effect.action);
            next = actual.next(effect.response);
        });
    }

    // Else test against a snapshot
    const actions = [];
    do {
        result = actual.next();
        if (!result.done) {
            actions.push(result);
        }
    } while (!result.done);

    expect(actions).toMatchSnapshot();
};
