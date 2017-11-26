import { AnyAction, Reducer } from "redux";
import { describeAssertion } from "./helpers/assert";
import withJestOptions from "./helpers/withJestOptions";
import FluentTester from "./Testers/FluentTester";
import ReducerTester from "./Testers/ReducerTester";
import countArguments from "./helpers/countArguments";

export type Dispatcher = AnyAction | null;

export type StatelessReducerCallback = (
    wrapper: (
        description: string,
        state: any,
        action: AnyAction,
        ...other: any[]
    ) => any,
) => void;

export type StatelessReducerWrapper = (
    description: string,
    state?: any,
    dispatcher?: Dispatcher | StatelessReducerCallback,
    expected?: any,
) => void;

export type StatefulReducerCallback = (
    wrapper: (action: AnyAction, ...other: any[]) => any,
) => void;

export type StatefulReducerWrapper = (
    description: string,
    dispatcher: Dispatcher | StatefulReducerCallback,
    expected?: any,
) => void;

export function reducerTester(tested: Reducer<any>, state?: any) {
    const stateful = (newDescription, dispatcher, expected) =>
        reducer(newDescription, tested, state, dispatcher, expected);

    const stateless = (newDescription, state, dispatcher, expected) =>
        reducer(newDescription, tested, state, dispatcher, expected);

    return typeof state === "undefined"
        ? (stateless as StatelessReducerWrapper)
        : (stateful as StatefulReducerWrapper);
}

function reducer(
    description: string,
    tested: Reducer<any>,
    state: any,
    dispatcher?: Dispatcher | StatefulReducerCallback,
    expected?: any,
    it?: jest.It,
): void {
    let tester = new ReducerTester().setTester(it);

    switch (true) {
        case typeof description === "string":
            tester = tester.setDescription(description);

        case typeof dispatcher === "function":
            tester = tester.setCallback(dispatcher as Function);

        case typeof dispatcher === "object":
            tester = tester.setAction(dispatcher as AnyAction);

        case typeof expected !== "undefined":
            tester = tester.setExpected(expected);
    }

    return tester
        .setReducer(tested)
        .setState(state)
        .run();

    // If we passed a callback, provide the wrapper to it
    if (typeof dispatcher === "function") {
        tester = tester || it;
        tester(description, () => {
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
