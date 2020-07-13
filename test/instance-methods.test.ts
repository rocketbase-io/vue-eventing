import { VueEventing } from "src/index";
import { MixEventing } from "src/mixin";

VueEventing({ instanceMethods: true, emitIntegration: true });
class Mixed extends MixEventing(Object) {}
const instance = new Mixed();

describe("instanceMethodOn", () => {
  it("should attach an event handler", () => {
    const handler = jest.fn();
    instance.$on("foo", handler);
    instance.$emit("foo", 1, "bar");
    expect(handler).toHaveBeenCalledWith(1, "bar");
  });

  it("should attach a handler for multiple events", () => {
    const handler = jest.fn();
    instance.$on(["foo", "bar"], handler);
    instance.$emit("foo");
    instance.$emit("bar");
    expect(handler).toHaveBeenCalledTimes(2);
  });
});

describe("instanceMethodOff", () => {
  it("should remove an existing event handler", () => {
    const handler = jest.fn();
    instance.$on("foo", handler);
    instance.$off("foo", handler);
    instance.$emit("foo");
    expect(handler).not.toHaveBeenCalled();
  });

  it("should remove an existing handler for multiple events", () => {
    const handler = jest.fn();
    instance.$on(["foo", "bar"], handler);
    instance.$off(["foo", "bar"], handler);
    instance.$emit("foo");
    instance.$emit("bar");
    expect(handler).not.toHaveBeenCalled();
  });
});

describe("instanceMethodOnce", () => {
  it("should unregister an existing event handler after first call per event", () => {
    const handler = jest.fn();
    instance.$once(["foo", "bar"], handler);
    instance.$once("baz", handler);
    for (const event of ["foo", "bar", "baz"]) {
      instance.$emit(event);
      instance.$emit(event);
      instance.$emit(event);
    }
    expect(handler).toHaveBeenCalledTimes(3);
  });
});
