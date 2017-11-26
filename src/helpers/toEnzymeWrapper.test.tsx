import * as React from "react";
import { connect } from "react-redux";
import toEnzymeWrapper from "./toEnzymeWrapper";

const App = ({ text }) => <p>{text}</p>;

it("can wrap normal element", () => {
    const wrapper = toEnzymeWrapper(<App text="hello" />);
    expect(wrapper.html()).toBe("<p>hello</p>");
});

it("can wrap element function", () => {
    const wrapper = toEnzymeWrapper(App);
    expect(wrapper.html()).toBe("<p></p>");
});
