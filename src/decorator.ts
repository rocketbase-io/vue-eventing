import { bus } from "src/bus";
import { config } from "src/config";
import { installEmitIntegration } from "src/emit-integration";
import { EventingInstance } from "src/types";
import { installInstanceMethods } from "src/instance-methods";

export function Eventing<T, Args extends []>(cls: new (...args: Args) => T): new (...args: Args) => T & EventingInstance<T> {
  const proto = cls.prototype as any;
  const beforeCreate = proto.beforeCreate;
  proto.beforeCreate = function (this: T, ...args: unknown[]) {
    const cxt = this as EventingInstance<T> & T;
    const eventbus = (cxt.$eventbus = bus());
    if (config.emitIntegration) installEmitIntegration(cxt);
    eventbus.emit("hook:beforeCreate");
    return beforeCreate?.call(this, ...args);
  };
  if (config.instanceMethods) installInstanceMethods(proto);
  return cls as new (...args: Args) => EventingInstance<T> & T;
}
