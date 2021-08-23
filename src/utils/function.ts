import React from 'react';
import { isFragment } from 'react-is';

export function noop() {}

export function isNumber(val: unknown): val is number {
  return typeof val === 'number';
}

export function isObject(val: unknown): val is Record<any, any> {
  return val !== null && typeof val === 'object';
}

export function isString(val: unknown): val is string {
  return typeof val === 'string';
}

export function isDef(val: unknown): val is undefined {
  return typeof val !== undefined;
}

export function isFunction(val: unknown): val is (...args: any[]) => void {
  return typeof val === 'function';
}

export default function toArray(
  children: React.ReactNode,
  option: Record<string, any> = {},
): React.ReactElement[] {
  let ret: React.ReactElement[] = [];

  React.Children.forEach(children, (child: any) => {
    if ((child === undefined || child === null) && !option.keepEmpty) {
      return;
    }

    if (Array.isArray(child)) {
      ret = ret.concat(toArray(child));
    } else if (isFragment(child) && child.props) {
      ret = ret.concat(toArray(child.props.children, option));
    } else {
      ret.push(child);
    }
  });

  return ret;
}

export const tuple = <T extends string[]>(...args: T) => args;
