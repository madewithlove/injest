import { ComponentFactory } from '../component';
import { mount, render } from 'enzyme';
import matchesSnapshot from '../helpers/matchesSnapshot';
import toJson from 'enzyme-to-json';
import toEnzymeWrapper, { EnzymeWrapper } from '../helpers/toEnzymeWrapper';
import { call } from 'redux-saga/effects';

export enum TestType {
    Any,
    Component,
}

export default class FluentTester {
    /**
     * Middlewares to apply to the tested party
     */
    middlewares: Function[] = [];

    /**
     * The test runner to use
     */
    tester: jest.It = it;

    /**
     * The test's description
     */
    description: string;

    /**
     * The value being tested
     */
    tested: any;

    /**
     * The type of value being tested
     */
    type: TestType = TestType.Any;

    /**
     * The expected value
     */
    expected?: any;

    /**
     * A callback to run the tests with
     */
    callback: Function;

    setDescription(description: string) {
        this.description = description;

        return this;
    }

    setTester(tester: jest.It) {
        this.tester = tester || it;

        return this;
    }

    setTested(value: any, type: TestType = TestType.Any) {
        this.tested = value;
        this.type = type;

        return this;
    }

    setExpected(value: any) {
        this.expected = value;

        return this;
    }

    setCallback(callback: Function) {
        this.callback = callback;

        return this;
    }

    getProcessedValue() {
        return this.middlewares.reduce(
            (value, middleware) => middleware(value),
            this.tested,
        );
    }

    /**
     * Get the tested value in a workable form for callbacks
     */
    getWorkableValue(): EnzymeWrapper | any {
        switch (this.type) {
            case TestType.Component:
                return toEnzymeWrapper(this.tested, mount);

            default:
                return this.tested;
        }
    }

    /**
     * Get the tested value in serializable form for snapshots
     */
    getSerializedValue(): string | object {
        switch (this.type) {
            case TestType.Component:
                return toJson(toEnzymeWrapper(this.tested, render));

            default:
                return this.tested;
        }
    }

    /**
     * Run the tests
     */
    run() {
        const value = this.getProcessedValue();
        const actions = () => {
            if (this.callback) {
                this.callback(value, matchesSnapshot);
            } else if (typeof this.expected !== 'undefined') {
                expect(this.tested).toBe(this.expected);
            } else {
                expect(value).toMatchSnapshot();
            }
        };

        this.description ? this.tester(this.description, actions) : actions();
    }
}
