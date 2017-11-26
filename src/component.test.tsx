import * as React from "react";
import DummyComponent from "./__dummies__/DummyComponent";
import component from "./component";

component("can create snapshots easily", <DummyComponent text="bar" />);

component("can accept a component factory if you're lazy", DummyComponent);

component(
    "can snapshot part of component",
    <DummyComponent text="bar" />,
    ".some-div",
);

component(
    "provides access to the Enzyme wrapper if need be",
    <DummyComponent text="bar" />,
    (wrapper, snapshot) => {
        // You can snapshot the wrapper at any type
        snapshot(wrapper.find(".some-div"));

        // Instance of Enzyme's mount wrapper
        wrapper.find("button").simulate("click");
        snapshot(wrapper);
    },
);

it("can use helper as snapshot function", () => {
    component(<DummyComponent text="snap" />);
});