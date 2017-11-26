import * as React from "react";
import { component, reducer } from ".";
import DummyComponent from "./__dummies__/DummyComponent";

it("can export correct modules", () => {
    expect(component).not.toBeNull();
    expect(reducer).not.toBeNull();
});

component("can use enzyme matchers", <DummyComponent text="bar" />, wrapper => {
    expect(wrapper.find(".some-div").length).toBeTruthy();
});
