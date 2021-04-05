export function noop() {}

export function isObject(val: unknown): val is Record<any, any> {
  return val !== null && typeof val === 'object';
}

export function isString(val: unknown): val is string {
  return typeof val === 'string';
}

export function toArray<T>(item: T | T[]): T[] {
  return Array.isArray(item) ? item : [item];
}

export const tuple = <T extends string[]>(...args: T) => args;
