import { AnyAction, Reducer } from 'redux';

export type ReducerCallback = (
    wrapper: (action: AnyAction, ...other: any[]) => any,
) => void;

export default function reducer(
    description: string,
    tested: Reducer<any>,
    state: any,
    dispatcher: AnyAction | ReducerCallback,
    expected?: any,
) {
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
