import FluentTester, { TestType } from "./FluentTester";
import { AnyAction, Reducer } from "redux";

export default class ReducerTester extends FluentTester {
    state: any;

    action: AnyAction;

    setAction(action: AnyAction) {
        this.action = action;

        return this;
    }

    setState(state: any) {
        this.state = state;

        return this;
    }

    setReducer(reducer: Reducer<any>) {
        return this.setTested(reducer, TestType.Reducer);
    }

    run(): any {
        this.middlewares.push(reducer => {
            return typeof this.state !== "undefined" &&
                typeof this.action !== "undefined"
                ? reducer(this.state, this.action)
                : reducer;
        });

        return super.run();
    }
}
