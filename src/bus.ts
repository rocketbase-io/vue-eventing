import { Emitter, Handler } from "src/types";

export function bus(handlers?: Record<string, Handler | Handler[]>): Emitter {
  const listeners: Record<string, Handler[]> = {};
  /* eslint-disable-next-line */
  if (handlers) for (const [event, handler] of Object.entries(handlers))
    listeners[event] = typeof handler === "function" ? [handler] : handler;
  return {
    on(event, handler) {
      (listeners[event] ?? (listeners[event] = [])).push(handler);
    },
    off(event, handler) {
      const handlers = listeners[event];
      if (handlers && handlers.includes(handler)) handlers.splice(handlers.indexOf(handler), 1);
    },
    emit(event, ...args) {
      const handlers = listeners[event];
      if (!handlers) return;
      for (const handler of handlers) {
        handler(...args);
      }
    },
    reset(event: string) {
      delete listeners[event];
    },
  };
}
