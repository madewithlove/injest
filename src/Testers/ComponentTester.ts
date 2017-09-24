import FluentTester, { TestType } from './FluentTester';
import toJson from 'enzyme-to-json';
import { ComponentFactory } from '../component';
import { mount, render } from 'enzyme';
import toEnzymeWrapper from '../helpers/toEnzymeWrapper';

export default class ComponentTester extends FluentTester {
    middlewares = [this.wrapComponent.bind(this)];

    wrapComponent(component) {
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
        this.middlewares.push(
            component => (this.callback ? component : toJson(component)),
        );

        super.run();
    }
}
