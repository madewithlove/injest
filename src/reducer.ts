import { AnyAction, Reducer } from 'redux';
import assert, { default as describeAssertion } from './helpers/assert';
import withJestOptions from './helpers/withJestOptions';

export type Dispatcher = AnyAction | ReducerCallback | null;

export type ReducerCallback = (
    wrapper: (action: AnyAction, ...other: any[]) => any,
) => void;

export type ReducerWrapper = (
    description: string,
    dispatcher: Dispatcher,
    expected?: any,
) => void;

export function reducerTester(
    tested: Reducer<any>,
    state: any,
): ReducerWrapper {
    return (newDescription, dispatcher, expected) =>
        reducer(newDescription, tested, state, dispatcher, expected);
}

function reducer(
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

    describeAssertion(
        description,
        tested(state, dispatcher as AnyAction),
        expected,
    );
}

export default withJestOptions(reducer);
