import { component } from ".";
import FluentTester, { TestType } from "./FluentTester";
import toJson from "enzyme-to-json";
import { ComponentFactory } from "../component";
import { mount, ReactWrapper, render } from "enzyme";
import toEnzymeWrapper, { EnzymeWrapper } from "../helpers/toEnzymeWrapper";

export default class ComponentTester extends FluentTester {
    toEnzymeWrapper(component): EnzymeWrapper {
        return toEnzymeWrapper(component, this.callback ? mount : render);
    }

    setComponent(value: ComponentFactory) {
        return this.setTested(value, TestType.Component);
    }

    onlySelector(selector: string) {
        this.middlewares.push(wrapper => wrapper.find(selector));

        return this;
    }

    run() {
        this.middlewares = [
            this.toEnzymeWrapper.bind(this),
            ...this.middlewares,
            component => (this.callback ? component : toJson(component)),
        ];

        super.run();
    }
}
