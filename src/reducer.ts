import { AnyAction, Reducer } from 'redux';

export type ReducerCallback = (
    wrapper: (action: AnyAction, ...other: any[]) => any,
) => void;

export default function reducer(
    description: string,
    tested: Reducer<any>,
    state: any,
    dispatcher?: AnyAction | ReducerCallback,
    expected?: any,
) {
    // If we passed no dispatcher, return a factory
    if (typeof dispatcher === 'undefined') {
        return (newDescription, dispatcher, expected) => reducer(newDescription, tested, state, dispatcher, expected);
    }

    // If we passed a callback, provide the wrapper to it
     if (typeof dispatcher === 'function') {
        it(description, () => {
            dispatcher((action: AnyAction, ...args) => {
                expect(tested(state, action, ...args)).toMatchSnapshot();
            });
        });
    }

    it(description, () => {
        const result = tested(state, dispatcher as AnyAction);

        if (typeof expected !== 'undefined') {
            expect(result).toEqual(expected);
        } else {
            expect(result).toMatchSnapshot();
        }
    });
}
