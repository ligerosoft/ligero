import { useEffect } from 'react';
import useTouch from './use-touch';

const BODY_LOCK_CLASS = `ligero-overflow-hidden`;

let lockCount = 0;

export default function useLock(shouldLock: boolean) {
  const touch = useTouch();

  const lock = () => {
    document.addEventListener('touchstart', touch.start);
    document.addEventListener('touchmove', touch.move, { passive: false });

    if (!lockCount) {
      document.body.classList.add(BODY_LOCK_CLASS);
    }
    lockCount++;
  };

  const unLock = () => {
    if (lockCount) {
      document.removeEventListener('touchstart', touch.start);
      document.removeEventListener('touchmove', touch.move);
      lockCount--;
      if (!lockCount) {
        document.body.classList.remove(BODY_LOCK_CLASS);
      }
    }
  };

  useEffect(() => {
    if (shouldLock) {
      lock();
    } else {
      unLock();
    }
    return () => {
      unLock();
    };
  }, [shouldLock]);
}
