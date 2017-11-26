import * as React from "react";
import matchesSnapshot from "./matchesSnapshot";
import DummyComponent from "../__dummies__/DummyComponent";
import { mount } from "enzyme";

it("can snapshot a wrapper", () => {
    const wrapper = mount(<DummyComponent />);
    matchesSnapshot(wrapper);
});
