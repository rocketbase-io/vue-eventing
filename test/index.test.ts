import { VueEventing } from "src/index";
import { config } from "src/config";

describe("VueEventing", () => {
  it("should configure the eventing plugin", () => {
    expect(config.instanceMethods).toBeFalsy();
    expect(config.emitIntegration).toBeFalsy();
    VueEventing({
      instanceMethods: true,
      emitIntegration: true,
    });
    expect(config.instanceMethods).toBeTruthy();
    expect(config.emitIntegration).toBeTruthy();
  });
});
