import { mount, ReactWrapper, ShallowWrapper } from "enzyme";
import * as React from "react";
import { ReactElement } from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

export type EnzymeWrapper = Cheerio | ReactWrapper<any, any>;

export type EnzymeWrapperFactory = (
    element: ReactElement<any>,
    options?: any,
) => EnzymeWrapper;

export default function toEnzymeWrapper(
    tested: any,
    wrapper: EnzymeWrapperFactory = mount,
) {
    tested = tested.WrappedComponent || tested;
    if (typeof tested === "function") {
        tested = React.createElement(tested);
    }

    return wrapper(tested);
}
