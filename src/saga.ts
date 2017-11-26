import { AnyAction } from "redux";
import { call } from "redux-saga/effects";

export type SagaCallback = ((wrapper: SagaWrapper) => void) | any[];

export class SagaWrapper {
    steps = [];

    will(description: string, expected?: any): this {
        return this.then(description, expected);
    }

    then(description: string, expected?: any): this {
        this.steps.push({ description, expected });

        return this;
    }
}

export default function saga(
    description: string,
    saga: any,
    action: AnyAction,
    callback?: SagaCallback,
) {
    const wrapper = new SagaWrapper();

    // Unwrap the saga and store the result of
    // each yield into an array
    const actions = [];
    saga = saga(action);

    let key = 0;
    let result;
    do {
        key++;
        result = saga.next();
        if (!result.done) {
            actions.push(result);
        }
    } while (!result.done);

    // If we passed a callback function, provide the wrapper to it
    if (typeof callback === "function") {
        callback(wrapper);

        return wrapper.steps.forEach(({ description, expected }, key) => {
            it(description, () => {
                if (expected) {
                    expect(actions[key]).toEqual({
                        done: false,
                        value: expected,
                    });
                } else {
                    expect(actions[key]).toMatchSnapshot();
                }
            });
        });
    }

    it(description, () => {
        // If otherwise we passed an array, use it as effects
        if (Array.isArray(callback)) {
            const effects = callback.map(value => ({
                done: false,
                value,
            }));

            return expect(effects).toEqual(actions);
        }

        expect(actions).toMatchSnapshot();
    });
}
