import { bus } from "src/bus";
import { config } from "src/config";
import { installEmitIntegration } from "src/emit-integration";
import { installInstanceMethods } from "src/instance-methods";
import { EventingInstance } from "src/types";

export function MixEventing<T, Args extends []>(base: new (...args: Args) => T): new (...args: Args) => T & EventingInstance<T> {
  return (class extends ((base ?? Object) as any) {
    constructor(...args: Args) {
      super(...args);
      this.$eventbus = bus();
      if (config.instanceMethods) installInstanceMethods(this as any);
      if (config.emitIntegration) installEmitIntegration(this as any);
    }
  } as unknown) as new (...args: Args) => T & EventingInstance<T>;
}
