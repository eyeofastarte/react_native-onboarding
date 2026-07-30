import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import { useHydrated } from '@/store/useAppStore';

interface HydrationGateProps {
  children: React.ReactNode;
}

export function HydrationGate({ children }: HydrationGateProps) {
  const hydrated = useHydrated();
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    if (hydrated && !appReady) {
      setAppReady(true);
      SplashScreen.hideAsync().catch(() => {
        // Ignore failures here; splash screen is best-effort.
      });
    }
  }, [hydrated, appReady]);

  if (!appReady) {
    return null;
  }

  return <>{children}</>;
}
