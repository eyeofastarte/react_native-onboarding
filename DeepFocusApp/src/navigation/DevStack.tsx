import { createStackNavigator } from '@react-navigation/stack';
import type { DevStackParamList } from '@/navigation/types';
import { DevScreen } from '@/screens/dev/DevScreen';
import { ExploreScreen } from '@/screens/dev/ExploreScreen';
import { useTranslation } from 'react-i18next';

const Stack = createStackNavigator<DevStackParamList>();

export function DevStack() {
  const { t } = useTranslation()

  return (
    <Stack.Navigator initialRouteName="DevHome">
      <Stack.Screen name="DevHome" component={DevScreen} options={{ title: t('deep-focus-app') }} />
      <Stack.Screen name="DevExplore" component={ExploreScreen} options={{ title: t('explore-page') }} />
    </Stack.Navigator>
  );
}
