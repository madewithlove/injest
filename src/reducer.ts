import { AnyAction, Reducer } from 'redux';

export type Dispatcher = AnyAction | ReducerCallback | null;

export type ReducerCallback = (
    wrapper: (action: AnyAction, ...other: any[]) => any,
) => void;

export type ReducerWrapper = (
    description: string,
    dispatcher: Dispatcher,
    expected?: any,
) => void;

export function reducerTester(tested: Reducer<any>, state: any): ReducerWrapper {
    return (newDescription, dispatcher, expected) =>
        reducer(newDescription, tested, state, dispatcher, expected);
}

export default function reducer(
    description: string,
    tested: Reducer<any>,
    state: any,
    dispatcher?: Dispatcher,
    expected?: any,
): void {
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
