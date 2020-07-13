export type Handler = (...args: unknown[]) => unknown;
export type EmitFn = (event: string, ...args: unknown[]) => EventingInstance;

export interface EventingInstance<T = unknown> {
  $on(event: string, handler: Handler): this;
  $on(events: string[], handler: Handler): this;
  $once(event: string, handler: Handler): this;
  $once(events: string[], handler: Handler): this;
  $off(event: string, handler: Handler): this;
  $off(events: string[], handler: Handler): this;
  $emit: EmitFn;
  $eventbus: Emitter;
}

export interface Emitter {
  on(event: string, handler: Handler): void;
  off(event: string, handler: Handler): void;
  emit(event: string, ...args: unknown[]): void;
  reset(event: string): void;
}
