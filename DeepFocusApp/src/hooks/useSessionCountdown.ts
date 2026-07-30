import { useEffect, useMemo, useState } from 'react';

import { useAppStore } from '@/store/useAppStore';

export function useSessionCountdown() {
  const activeSession = useAppStore((state) => state.activeSession);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (activeSession?.status !== 'running') return;

    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [activeSession?.id, activeSession?.status]);

  const remainingMs = useMemo(() => {
    if (activeSession == null) return 0;

    if (activeSession.status === 'running') {
      return Math.max(0, activeSession.endAt - now);
    }

    return Math.max(0, activeSession.phaseDurationMs - activeSession.pausedAccumMs);
  }, [activeSession, now]);

  return {
    activeSession,
    remainingMs,
    isRunning: activeSession?.status === 'running',
  };
}
