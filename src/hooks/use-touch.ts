import React, { useRef } from 'react';

const MIN_DISTANCE = 10;

export type Direction = 'horizontal' | 'vertical' | '';
function getDirection(x: number, y: number) {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal';
  }
  if (y > x && y > MIN_DISTANCE) {
    return 'vertical';
  }
  return '';
}

export default function useTouch() {
  const direction = useRef<Direction>('');
  const startX = useRef(0);
  const startY = useRef(0);
  const deltaX = useRef(0);
  const deltaY = useRef(0);
  const offsetX = useRef(0);
  const offsetY = useRef(0);

  const reset = () => {
    startX.current = 0;
    startY.current = 0;
    deltaY.current = 0;
    deltaX.current = 0;
    offsetX.current = 0;
    offsetX.current = 0;
  };
  const start = (e: React.TouchEvent | TouchEvent) => {
    reset();
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  };

  const move = (e: React.TouchEvent | TouchEvent) => {
    const touch = e.touches[0];

    deltaX.current = touch.clientX - startX.current;
    deltaY.current = touch.clientY - startY.current;

    offsetX.current = Math.abs(deltaX.current);
    offsetY.current = Math.abs(deltaY.current);

    if (!direction.current) {
      direction.current = getDirection(offsetX.current, offsetY.current);
    }
  };
  const isHorizontal = direction.current === 'horizontal';
  const isVertical = direction.current === 'vertical';
  return {
    start,
    move,
    reset,

    startX: startX.current,
    startY: startY.current,
    deltaX: deltaX.current,
    deltaY: deltaY.current,

    offsetX: offsetX.current,
    offsetY: offsetY.current,

    direction,
    isHorizontal,
    isVertical,
  };
}
