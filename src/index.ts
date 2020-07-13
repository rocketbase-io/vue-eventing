import { config, VueEventingOptions } from "src/config";
export * from "src/mixin";
export * from "src/decorator";
export * from "src/bus";
export * from "src/types";

export function VueEventing({ instanceMethods, emitIntegration }: VueEventingOptions = {}): void {
  if (instanceMethods) config.instanceMethods = true;
  if (emitIntegration) config.emitIntegration = true;
}
