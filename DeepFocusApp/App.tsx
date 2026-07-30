import 'react-native-gesture-handler';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import { AppProviders, useApplyThemePreference } from './src/components/providers/AppProviders';
// import { HydrationGate } from './src/components/providers/HydrationGate';
import { RootNavigator } from './src/navigation/RootNavigator';
import { useAppStore } from './src/store/useAppStore';

import './src/i18n';

function AppShell() {
  const themePreference = useAppStore((state) => state.settings.themePreference);

  useApplyThemePreference(themePreference);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default function App() {
  return (
    <AppProviders>
      {/*
        HydrationGate temporarily disabled.
        Reason: native startup could stall on splash/logo (web unaffected).
        Re-enable after fixing hydration + splash race and adding a timeout fallback.
      */}
      <AppShell />
    </AppProviders>
  );
}
