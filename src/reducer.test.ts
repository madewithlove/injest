import reducer, { reducerTester } from "./reducer";
import someReducer from "./__dummies__/dummyReducer";

const initialState = 0;

reducer("can snapshot the result of an action", someReducer, initialState, {
    type: "INCREMENT",
});

reducer(
    "can also assert against a specific result",
    someReducer,
    initialState,
    { type: "INCREMENT" },
    1,
);

reducer(
    "can do multiple of these for a given reducer",
    someReducer,
    initialState,
    wrapper => {
        wrapper({ type: "INCREMENT" }); // Assert result equals snapshot
        wrapper({ type: "INCREMENT" }, 1); // Assert result equals given value
    },
);

// You can also create a shortcut factory
const countReducer = reducerTester(someReducer, initialState);

countReducer("which can then be used as such", { type: "INCREMENT" });
countReducer("or as such", { type: "INCREMENT" }, 1);

// Or without a default initial state
const otherCountReducer = reducerTester(someReducer);

otherCountReducer("which can then be used as such", 1, { type: "INCREMENT" });
otherCountReducer("or as such", 2, { type: "INCREMENT" }, 3);
