export interface VueEventingOptions {
  instanceMethods?: boolean;
  emitIntegration?: boolean;
}

export const config: Required<VueEventingOptions> = {
  instanceMethods: false,
  emitIntegration: false,
};
