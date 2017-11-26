import FluentTester from "./FluentTester";

new FluentTester()
    .setDescription("can build test with fluent interface")
    .setTested(true)
    .setExpected(true)
    .run();

new FluentTester()
    .setDescription("can use snapshots")
    .setTested({ foo: "bar" })
    .run();
