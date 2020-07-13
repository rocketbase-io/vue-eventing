import { config, VueEventingOptions } from "src/config";
export * from "src/mixin";

export function VueEventing({ instanceMethods, emitIntegration }: VueEventingOptions = {}): void {
  if (instanceMethods) config.instanceMethods = true;
  if (emitIntegration) config.emitIntegration = true;
}
