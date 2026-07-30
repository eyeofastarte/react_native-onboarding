import { createStackNavigator } from '@react-navigation/stack';

import { LightModeTopTimerOverlay } from '@/components/session/LightModeTopTimerOverlay';
import { SessionAppStateGuard } from '@/components/session/SessionAppStateGuard';
import { MainTabs } from '@/navigation/MainTabs';
import type { RootStackParamList } from '@/navigation/types';
import { TaskEditorScreen } from '@/screens/TaskEditorScreen';

const Stack = createStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <>
      <SessionAppStateGuard />
      <LightModeTopTimerOverlay />
      <Stack.Navigator>
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen
          name="TaskEditor"
          component={TaskEditorScreen}
          options={{ title: 'New Task', presentation: 'modal' }}
        />
      </Stack.Navigator>
    </>
  );
}
