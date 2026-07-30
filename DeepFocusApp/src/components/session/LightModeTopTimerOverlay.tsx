import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from '@rneui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useSessionCountdown } from '@/hooks/useSessionCountdown';
import { formatRemaining } from '@/lib/studyTimer';
import { useAppStore } from '@/store/useAppStore';

export function LightModeTopTimerOverlay() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const mode = useAppStore((state) => state.settings.mode);
  const tasks = useAppStore((state) => state.tasks);
  const { activeSession, remainingMs, isRunning } = useSessionCountdown();

  if (mode !== 'light' || !isRunning || activeSession == null) return null;

  const task = tasks.find((item) => item.id === activeSession.taskId);

  return (
    <View
      style={[
        styles.overlay,
        {
          top: insets.top + 8,
          backgroundColor: theme.colors.primary,
        },
      ]}>
      <Text style={[styles.timer, { color: theme.colors.white }]}>{formatRemaining(remainingMs)}</Text>
      <Text style={[styles.task, { color: theme.colors.white }]} numberOfLines={1}>
        {task?.title ?? 'Study Task'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 20,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  timer: {
    fontWeight: '700',
    fontSize: 14,
  },
  task: {
    flex: 1,
    fontSize: 12,
    opacity: 0.95,
  },
});
