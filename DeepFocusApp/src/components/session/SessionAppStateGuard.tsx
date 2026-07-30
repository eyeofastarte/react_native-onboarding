import { useEffect, useRef } from 'react';
import { Alert, AppState, type AppStateStatus } from 'react-native';

// Unresolved Multi-platform support issues
// import {
//   clearLightModeTimerOverlayNotification,
//   showLightModeTimerOverlayNotification,
// } from '@/lib/session-notifications';
import { formatRemaining } from '@/lib/studyTimer';
import { useAppStore } from '@/store/useAppStore';

export function SessionAppStateGuard() {
  const mode = useAppStore((state) => state.settings.mode);
  const warningPending = useAppStore((state) => state.warningPending);
  const recordDistraction = useAppStore((state) => state.recordDistraction);
  const returnFromDistraction = useAppStore((state) => state.returnFromDistraction);
  const clearWarning = useAppStore((state) => state.clearWarning);
  const activeSession = useAppStore((state) => state.activeSession);

  const appState = useRef<AppStateStatus>(AppState.currentState);
  const warningAlertVisible = useRef(false);
  const sessionRuntimeRef = useRef({
    mode,
    activeSession,
  });

  useEffect(() => {
    sessionRuntimeRef.current = {
      mode,
      activeSession,
    };
  }, [mode, activeSession]);

  useEffect(() => {
    const sub = AppState.addEventListener('change', async (nextState) => {
      const previousState = appState.current;
      appState.current = nextState;

      const wasActive = previousState === 'active';
      const movingAway = nextState === 'inactive' || nextState === 'background';
      const runtime = sessionRuntimeRef.current;

      if (
        wasActive &&
        movingAway &&
        runtime.activeSession != null &&
        runtime.activeSession.status === 'running' &&
        !warningAlertVisible.current
      ) {
        recordDistraction();
        if (runtime.mode === 'light') {
          const remainingMs = Math.max(0, runtime.activeSession.endAt - Date.now());
          console.log('showLightModeTimer under development')
          // await showLightModeTimerOverlayNotification(formatRemaining(remainingMs));
        }
      }

      if (previousState !== 'active' && nextState === 'active') {
        returnFromDistraction();
        console.log('clearLightModeTimer under development')
        // await clearLightModeTimerOverlayNotification();
      }
    });

    return () => {
      sub.remove();
    };
  }, [recordDistraction, returnFromDistraction]);

  useEffect(() => {
    if (!warningPending || warningAlertVisible.current) return;

    warningAlertVisible.current = true;
    Alert.alert(
      'Focus warning',
      'You left the app during an active study session. Stay in Foki to keep momentum.',
      [
        {
          text: 'OK',
          onPress: () => {
            warningAlertVisible.current = false;
            clearWarning();
          },
        },
      ],
      { cancelable: false }
    );
  }, [warningPending, clearWarning]);

  return null;
}
