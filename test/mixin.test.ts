import { MixEventing, VueEventing } from "src/index";

describe("MixEventing", () => {
  const settings = (instanceMethods: boolean, emitIntegration: boolean) => VueEventing({ instanceMethods, emitIntegration });
  beforeEach(() => settings(false, false));

  it("should add a $mitt instance variable to the mixed class instances", () => {
    class Mixed extends MixEventing(Object) {}
    const instance = new Mixed();
    expect(instance.$eventbus).toBeDefined();
  });

  it("should add instance integrations if configured", () => {
    settings(true, false);
    class Mixed extends MixEventing(Object) {}
    const instance = new Mixed();
    expect(instance.$on).toBeDefined();
    expect(instance.$once).toBeDefined();
    expect(instance.$off).toBeDefined();
  });

  it("should wrap $emit integrations if configured", () => {
    settings(true, true);
    const internalHandler = jest.fn();
    const eventArgs = [5, 6, "foo", { bar: "baz" }];
    class Mixed extends MixEventing(
      class {
        $emit(event: string, ...args: unknown[]) {
          internalHandler(event, ...args);
        }
      }
    ) {}
    const instance = new Mixed();
    const handler = jest.fn();
    instance.$on("the-event", handler);
    instance.$emit("the-event", ...eventArgs);
    expect(internalHandler).toHaveBeenCalledWith("the-event", ...eventArgs);
    expect(handler).toHaveBeenCalledWith(...eventArgs);
  });

  it("should add $emit integrations if configured and none provided", () => {
    settings(true, true);
    class Mixed extends MixEventing(Object) {}
    const instance = new Mixed();
    const handler = jest.fn();
    instance.$on("foo", handler);
    instance.$emit("foo");
    expect(handler).toHaveBeenCalled();
  });
});
