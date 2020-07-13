import { bus } from "src/bus";

describe("bus", () => {
  it("should generate on, off and emit methods", () => {
    const { on, off, emit } = bus();
    expect(on).toBeDefined();
    expect(off).toBeDefined();
    expect(emit).toBeDefined();
  });

  it("should pass all arguments to the handler", () => {
    const { on, emit } = bus();
    const handler = jest.fn();
    on("foo", handler);
    emit("foo", "bar", 5, { baz: "qux" });
    expect(handler).toHaveBeenCalledWith("bar", 5, { baz: "qux" });
  });

  it("should allow for a single handler to be attached multiple times", () => {
    const { on, emit } = bus();
    const handler = jest.fn();
    on("foo", handler);
    on("foo", handler);
    on("foo", handler);
    emit("foo");
    expect(handler).toHaveBeenCalledTimes(3);
  });

  it("should allow for a handler to be unregistered", () => {
    const { on, off, emit } = bus();
    const handler = jest.fn();
    on("foo", handler);
    off("foo", handler);
    emit("foo");
    expect(handler).not.toHaveBeenCalled();
  });

  it("should allow for a prepopulated map of handlers", () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    const handler3 = jest.fn();
    const { emit } = bus({ foo: handler1, bar: [handler2, handler3] });
    emit("foo");
    emit("bar");
    expect(handler1).toHaveBeenCalled();
    expect(handler2).toHaveBeenCalled();
    expect(handler3).toHaveBeenCalled();
  });

  it("should allow for resetting handlers", () => {
    const { on, emit, reset } = bus();
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    on("foo", handler1);
    on("foo", handler2);
    reset("foo");
    emit("foo");
    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).not.toHaveBeenCalled();
  });
});
