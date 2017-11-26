import * as React from "react";
import toEnzymeWrapper from "../helpers/toEnzymeWrapper";
import matchesSnapshot from "./matchesSnapshot";
import DummyComponent from "../__dummies__/DummyComponent";

it("can snapshot a wrapper", () => {
    const wrapper = toEnzymeWrapper(<DummyComponent />);
    matchesSnapshot(wrapper);
});
