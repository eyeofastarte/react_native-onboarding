import { ScrollView, StyleSheet, View } from 'react-native';
import { ButtonGroup, Card, Divider, ListItem, Text, useTheme } from '@rneui/themed';

import { useAppStore } from '@/store/useAppStore';

const modeIndexByValue = {
  light: 0,
  strict: 1,
} as const;

export function SettingsScreen() {
  const { theme } = useTheme();
  const settings = useAppStore((state) => state.settings);
  const setMode = useAppStore((state) => state.setMode);

  return (
    <ScrollView style={[styles.screen, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
      <Text h3 style={{ color: theme.colors.black }}>
        Settings
      </Text>

      <Card>
        <Text style={[styles.title, { color: theme.colors.black }]}>Study Mode</Text>
        <Text style={{ color: theme.colors.grey5, marginBottom: 10 }}>
          Light Mode supports background timer overlay. Strict Mode UI is ready, logic not yet active.
        </Text>

        <ButtonGroup
          buttons={['Light Mode', 'Strict Mode']}
          selectedIndex={modeIndexByValue[settings.mode]}
          onPress={(index) => setMode(index === 0 ? 'light' : 'strict')}
        />
      </Card>

      <Card>
        <Text style={[styles.title, { color: theme.colors.black }]}>Focus Duration</Text>
        <ListItem containerStyle={styles.rowItem}>
          <ListItem.Content>
            <ListItem.Title>{settings.durations.focusMinutes} minutes</ListItem.Title>
            <ListItem.Subtitle>Current focus block length</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <Divider />
        <View style={styles.hintWrap}>
          <Text style={{ color: theme.colors.grey5, fontSize: 12 }}>
            Adjust duration by editing `settings.durations.focusMinutes` integration next.
          </Text>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  rowItem: {
    paddingHorizontal: 0,
  },
  hintWrap: {
    paddingTop: 10,
  },
});
