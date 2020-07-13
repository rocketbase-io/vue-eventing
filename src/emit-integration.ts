import { EmitFn, EventingInstance } from "src/types";

export function installEmitIntegration(instance: EventingInstance): void {
  instance.$emit = wrapEmitter(instance.$emit);
}

export function wrapEmitter(emitter?: EmitFn): EmitFn {
  return function (this: EventingInstance, event: string, ...args: unknown[]) {
    const result = emitter?.call(this, event, ...args);
    this.$eventbus.emit(event, ...args);
    return result ?? this;
  };
}
