import { useEffect, useRef } from 'react';
import { ThemeProvider, useThemeMode } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { fokiTheme } from '@/theme/fokiTheme';
import '@/lib/notification-handler';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={fokiTheme}>
        <StatusBar style="auto" />
        {children}
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

/**
 * Syncs the RNEUI theme mode with the user-selected preference.
 * The component that uses this hook must be rendered inside ThemeProvider.
 */
export function useApplyThemePreference(preference: 'system' | 'light' | 'dark') {
  const { setMode } = useThemeMode();
  const lastAppliedModeRef = useRef<'light' | 'dark' | null>(null);

  useEffect(() => {
    const targetMode: 'light' | 'dark' = preference === 'dark' ? 'dark' : 'light';

    if (lastAppliedModeRef.current === targetMode) return;

    lastAppliedModeRef.current = targetMode;
    setMode(targetMode);
  }, [preference, setMode]);
}
