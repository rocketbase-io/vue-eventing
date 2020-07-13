import { Eventing } from "src/decorator";
import { VueEventing } from "src/index";
import { EventingInstance } from "src/types";

describe("@Eventing", () => {
  const settings = (instanceMethods: boolean, emitIntegration: boolean) => VueEventing({ instanceMethods, emitIntegration });
  beforeEach(() => settings(false, false));

  it("should install instance methods on decorated classes", () => {
    settings(true, false);
    @Eventing
    class Decorated {}
    const instance = new Decorated();
    const casted = instance as EventingInstance;
    expect(casted.$on).toBeDefined();
    expect(casted.$once).toBeDefined();
    expect(casted.$off).toBeDefined();
  });

  it("should install emit integrations on the beforeCreate lifecycle hook", () => {
    settings(false, true);
    @Eventing
    class Decorated {}
    const instance = new Decorated();
    const casted = instance as EventingInstance;
    (instance as any).beforeCreate(); // generated method
    expect(casted.$eventbus).toBeDefined();
    expect(casted.$emit).toBeDefined();
  });
});
