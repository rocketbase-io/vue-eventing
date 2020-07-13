import { bus } from "src/bus";
import { EventingInstance, Handler } from "src/types";

export function installInstanceMethods(cxt: EventingInstance): void {
  cxt.$on = instanceMethodOn;
  cxt.$off = instanceMethodOff;
  cxt.$once = instanceMethodOnce;
}

export function instanceMethodOn(this: EventingInstance, events: string | string[], handler: Handler): EventingInstance {
  const { on } = this.$eventbus ?? (this.$eventbus = bus());
  for (const event of typeof events === "string" ? [events] : events) on(event, handler);
  return this;
}

export function instanceMethodOff(this: EventingInstance, events: string | string[], handler: Handler): EventingInstance {
  const { off } = this.$eventbus ?? (this.$eventbus = bus());
  for (const event of typeof events === "string" ? [events] : events) off(event, handler);
  return this;
}

export function instanceMethodOnce(this: EventingInstance, events: string | string[], handler: Handler): EventingInstance {
  const { on, off } = this.$eventbus ?? (this.$eventbus = bus());
  for (const event of typeof events === "string" ? [events] : events) {
    on(event, function wrapper(this: unknown, ...args: unknown[]) {
      off(event, wrapper);
      handler.call(this, ...args);
    });
  }
  return this;
}
