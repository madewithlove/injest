import { ComponentFactory } from '../component';
import { mount, render } from 'enzyme';
import matchesSnapshot from '../helpers/matchesSnapshot';
import toJson from 'enzyme-to-json';

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

    setDescription(description: string) {
        this.description = description;

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

    /**
     * Get the tested value in a workable form for callbacks
     */
    getWorkableValue(): any {
        switch (this.type) {
            case TestType.Component:
                return mount(this.tested);

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
                return toJson(render(this.tested));

            default:
                return this.tested;
        }
    }

    /**
     * Run the tests
     */
    run() {
        this.tester(this.description, () => {
            if (typeof this.expected !== 'undefined') {
                expect(this.tested).toBe(this.expected);
            } else {
                expect(this.getSerializedValue()).toMatchSnapshot();
            }
        });
    }

    /**
     * Run multiple tests with the given context
     */
    then(callback: Function) {
        this.tester(this.description, () => {
            callback(this.getWorkableValue(), matchesSnapshot);
        });
    }
}
