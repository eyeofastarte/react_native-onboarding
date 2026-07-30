import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import type { MainTabParamList } from '@/navigation/types';
import { DevStack } from '@/navigation/DevStack';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { TasksScreen } from '@/screens/TasksScreen';
import { TimerScreen } from '@/screens/TimerScreen';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator<MainTabParamList>();

const tabIconByRoute: Record<keyof MainTabParamList, string> = {
  Timer: 'timer-outline',
  Tasks: 'list-outline',
  Settings: 'settings-outline',
  Dev: 'code'
};

export function MainTabs() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        tabBarActiveTintColor: '#4F46E5',
        tabBarLabelStyle: { fontWeight: '600' },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={tabIconByRoute[route.name]} color={color} size={size} />
        ),
      })}>
      <Tab.Screen name="Timer" component={TimerScreen} options={{ title: 'Study' }} />
      <Tab.Screen name="Tasks" component={TasksScreen} options={{ title: 'Tasks' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      {/*<Tab.Screen name="Dev" component={DevScreen} options={{ title: t('deep-focus-app') }} />*/}
      <Tab.Screen name="Dev" component={DevStack} options={{ title: 'Dev', headerShown: false }} />

    </Tab.Navigator>
  );
}
