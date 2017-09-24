import FluentTester, { TestType } from './FluentTester';
import { ComponentFactory } from '../component';

export default class ComponentTester extends FluentTester {
    setComponent(value: ComponentFactory) {
        return this.setTested(value, TestType.Component);
    }
}
